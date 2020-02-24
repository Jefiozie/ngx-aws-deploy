import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import {
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { Schema } from "./schema";

function getWorkspace(
  host: Tree,
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter(path => host.exists(path))[0];

  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find angular.json`);
  }
  const content = configBuffer.toString();

  let workspace: experimental.workspace.WorkspaceSchema;
  try {
    workspace = (parseJson(
      content,
      JsonParseMode.Loose,
    ) as {}) as experimental.workspace.WorkspaceSchema;
  } catch (e) {
    throw new SchematicsException(`Could not parse angular.json`);
  }

  return {
    path,
    workspace,
  };
}
interface NgAddOptions extends Schema {
  project: string;
}

export const ngAdd = (options: NgAddOptions) => (
  tree: Tree,
  _context: SchematicContext,
) => {
  const { path: workspacePath, workspace } = getWorkspace(tree);

  if (!options.project) {
    if (workspace.defaultProject) {
      options.project = workspace.defaultProject;
    } else {
      throw new SchematicsException(
        'No Angular project selected and no default project in the workspace',
      );
    }
  }

  const project = workspace.projects[options.project];
  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace',
    );
  }

  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `Deploy requires an Angular project type of "application" in angular.json`,
    );
  }

  if (
    !project.architect ||
    !project.architect.build ||
    !project.architect.build.options ||
    !project.architect.build.options.outputPath
  ) {
    throw new SchematicsException(
      `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`,
    );
  }

  const buildConfiguration = options.buildConfiguration || 'production';
  if (!project.architect.build.configurations[buildConfiguration]) {
    throw new SchematicsException(
      `Build configuration '${options.buildConfiguration}' is not set in the workspace.`
    );
  }

  let _options: {} = {
    browserTarget: `${options.project}:build:${buildConfiguration}`,
    region: options.region,
    bucket: options.bucket,
    secretAccessKey: options.secretAccessKey,
    accessKeyId: options.accessKeyId,
  };
  _options = options.subFolder
    ? { ..._options, subFolder: options.subFolder }
    : _options;
  project.architect['deploy'] = {
    builder: '@jefiozie/ngx-aws-deploy:deploy',
    options: _options,
  };

  tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
  return tree;
};
