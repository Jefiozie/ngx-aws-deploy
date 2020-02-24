import {
  BuilderContext,
  BuilderOutput,
  createBuilder, targetFromTargetString
} from '@angular-devkit/architect';
import { experimental, normalize } from "@angular-devkit/core";
import { NodeJsSyncHost } from "@angular-devkit/core/node";
import { Schema } from "./schema";
import * as glob from "glob";
import { Uploader } from "./uploader";
import { getAccessKeyId, getSecretAccessKey } from './config';

export default createBuilder<any>(
  async (builderConfig: Schema, context: BuilderContext): Promise<any> => {
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

    // Get browser target options.
    const browserTarget = targetFromTargetString(builderConfig.browserTarget as string);
    const rawBrowserOptions = await context.getTargetOptions(browserTarget);
    const browserName = await context.getBuilderNameForTarget(browserTarget);

    const overrides = {
      // this is an example how to override the workspace set of options
      ...(builderConfig.baseHref && { baseHref: builderConfig.baseHref })
    };

    const browserOptions = await context.validateOptions({ ...rawBrowserOptions, ...overrides }, browserName);

    let buildResult: BuilderOutput;
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`);
    } else {
      context.logger.info(`📦 Building target ${builderConfig.browserTarget}`);
      const build = await context.scheduleTarget(browserTarget, { ...overrides });
      buildResult = await build.result;

      if (buildResult.success) {
        context.logger.info(`✔ Build Completed`);
      } else {
        return {
          error: `❌ Application build failed`,
          success: false,
        };
      }
    }

    const filesPath = browserOptions.outputPath as string;
    const files = await getFiles(filesPath);

    if (files.length === 0) {
      throw new Error(`The target outputPath '${filesPath}' does not exist or does not contain any files.`);
    }

    if (getAccessKeyId(builderConfig) || getSecretAccessKey(builderConfig)) {
      context.logger.info('Start uploading files...');
      const uploader = new Uploader(builderConfig, context);
      await uploader.upload(files, filesPath);
      context.logger.info('✔ Finished uploading files...');
      return { success: true };
    } else {
      return {
        error: `❌  Missing authentication settings for AWS`,
        success: false,
      };
    }

    function getFiles(filesPath: string) {
      return glob.sync(`**`, {
        ignore: ['.git'],
        cwd: filesPath,
        nodir: true
      });
    }
  },
);
