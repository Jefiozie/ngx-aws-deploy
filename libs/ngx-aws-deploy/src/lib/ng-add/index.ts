import { workspaces, virtualFs } from '@angular-devkit/core';
import {
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { Schema } from './schema';

function createVirtualHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string) {
      const buffer = tree.read(path);
      if (!buffer) {
        throw new Error(`File "${path}" not found.`);
      }
      return virtualFs.fileBufferToString(buffer);
    },
    async writeFile(path: string, data: string): Promise<void> {
      tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

async function getWorkspace(tree: Tree, path = '/') {
  const host = createVirtualHost(tree);
  const { workspace } = await workspaces.readWorkspace(path, host);
  return { host, workspace };
}

interface NgAddOptions extends Schema {
  project: string;
}

export const ngAdd = (options: NgAddOptions) => async (
  tree: Tree,
  context: SchematicContext
) => {
  const { host, workspace } = await getWorkspace(tree);
  const project = workspace.projects.get(options.project);

  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace.'
    );
  }

  if (project.extensions.projectType !== 'application') {
    throw new SchematicsException(
      `Deploy requires an Angular project type of "application" in angular.json.`
    );
  }

  const buildTarget = project.targets.get('build');

  if (!buildTarget) {
    throw new SchematicsException('Project target "build" not found.');
  }

  const outputPath = buildTarget.options?.outputPath as string | undefined;

  if (!outputPath) {
    throw new SchematicsException(
      `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json.`
    );
  }

  project.targets.add({
    name: 'deploy',
    builder: '@jefiozie/ngx-aws-deploy:deploy',
    options: {},
  });

  await workspaces.writeWorkspace(workspace, host);
  return tree;
};
