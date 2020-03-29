import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { experimental, normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { Schema } from './schema';
import deploy from './deploy';

export default createBuilder<any>(
  async (options: Schema, context: BuilderContext): Promise<any> => {
    const root = normalize(context.workspaceRoot);
    const workspace = new experimental.workspace.Workspace(
      root,
      new NodeJsSyncHost(),
    );
    await workspace
      .loadWorkspaceFromHost(normalize('angular.json'))
      .toPromise();

    if (!context.target) {
      throw new Error('Cannot deploy the application without a target');
    }
    const projectTargets = workspace.getProjectTargets(context.target.project);

    const buildTarget =
      options.buildTarget || `${context.target.project}:build:production`;

    try {
      await deploy(context, projectTargets, buildTarget, options);
    } catch (e) {
      console.error('Error when trying to deploy: ');
      console.error(e.message);
      return { success: false };
    }

    return { success: true };
  },
);
