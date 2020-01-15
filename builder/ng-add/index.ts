import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import {
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { Schema } from './schema';

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

function verifyAuthenticationFile(host: Tree): boolean {
  const possibleFiles = ['/aws.json'];
  return possibleFiles.filter(path => host.exists(path)).length > 0;
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
  let _options: {} = {
    region: options.region,
    bucket: options.bucket,
  };
  _options = options.subFolder
    ? { ..._options, subFolder: options.subFolder }
    : _options;
  project.architect['deploy'] = {
    builder: '@jefiozie/ngx-aws-deploy:deploy',
    options: _options,
  };

  tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
  _context.logger.info(
    `We updated your angular.json file, start creating authentication file`,
  );
  const authenticationOptions = {
    [options.project]: {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
    },
  };
  if (!verifyAuthenticationFile(tree)) {
    tree.create('/aws.json', JSON.stringify(authenticationOptions));
  } else {
    tree.overwrite('/aws.json', JSON.stringify(authenticationOptions));
  }

  _context.logger.info(`✅ Happy Deploying!`);
  return tree;
};
