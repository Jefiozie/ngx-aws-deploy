import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from "@angular-devkit/architect";
import { experimental, normalize, json } from "@angular-devkit/core";
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

    let buildResult: BuilderOutput;
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`);
      buildResult = {
        success : true
      }
    } else {
      const configuration = builderConfig.configuration ? builderConfig.configuration : "production";

      const overrides = {
        // this is an example how to override the workspace set of options
        ...(builderConfig.baseHref && { baseHref: builderConfig.baseHref })
      };

      const build = await context.scheduleTarget({
        target: 'build',
        project: context.target !== undefined ? context.target.project : '',
        configuration
      }, overrides as json.JsonObject);

      buildResult = await build.result;
    }
    if (buildResult.success) {
      context.logger.info(`✔ Build Completed`);
      const filesPath = buildResult.outputPath as string;
      const files = await getFiles(filesPath);

      if (files.length === 0) {
        throw new Error(
          'Target did not produce any files, or the path is incorrect.',
        );
      }
      if (getAccessKeyId(builderConfig) || getSecretAccessKey(builderConfig)) {
        context.logger.info('Start uploading files...');
        const uploader = new Uploader(context);
        await uploader.upload(files, filesPath, builderConfig);
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
    function getFiles(filesPath: string) {
      return glob.sync(`**`, {
        ignore: ['.git'],
        cwd: filesPath,
        nodir: true,
      });
    }
  },
);
