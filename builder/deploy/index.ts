import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { experimental, json, normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import * as glob from 'glob';
import { getAccessKeyId, getSecretAccessKey } from './config';
import { Schema } from './schema';
import { Uploader } from './uploader';

const getDeployConfiguration = (
  target: experimental.workspace.WorkspaceTool,
  config: string,
) => {
  if (
    target.deploy &&
    target.deploy.configurations &&
    target.deploy.configurations[config]
  ) {
    return target.deploy.configurations[config];
  }
  throw new Error(`Missing deploy configuration for ${config}`);
};

const getFiles = (filesPath: string) => {
  return glob.sync(`**`, {
    ignore: ['.git'],
    cwd: filesPath,
    nodir: true,
  });
};

export default createBuilder<any>(
  async (builderConfig: Schema, context: BuilderContext): Promise<any> => {
    context.reportStatus('Executing deployment');
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
    const configuration = builderConfig.configuration
      ? builderConfig.configuration
      : 'production';
    const deployConfig = getDeployConfiguration(projectTargets, configuration);

    let buildResult: BuilderOutput;
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`);
      const outputPath =
        projectTargets[context.target.target].options.outputPath;
      buildResult = {
        outputPath,
        success: true,
      };
    } else {
      const overrides = {
        // this is an example how to override the workspace set of options
        ...(builderConfig.baseHref && { baseHref: builderConfig.baseHref }),
      };
      const build = await context.scheduleTarget(
        {
          target: 'build',
          project: context.target.project,
          configuration,
        },
        overrides as json.JsonObject,
      );

      buildResult = await build.result;
      context.logger.info(`✔ Build Completed`);
    }
    if (buildResult.success) {
      const filesPath = buildResult.outputPath as string;
      const files = await getFiles(filesPath);

      if (files.length === 0) {
        throw new Error(
          'Target did not produce any files, or the path is incorrect.',
        );
      }
      if (getAccessKeyId(deployConfig) || getSecretAccessKey(deployConfig)) {
        context.logger.info('Start uploading files...');
        const uploader = new Uploader(context, deployConfig);
        await uploader.upload(files, filesPath);
        context.logger.info('✔ Finished uploading files...');
        return { success: true };
      } else {
        return {
          error: `❌  Missing authentication settings for AWS`,
          success: false,
        };
      }
    } else {
      return {
        error: `❌ Application build failed`,
        success: false,
      };
    }
  },
);
