import {
  BuilderContext,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { experimental, JsonObject } from '@angular-devkit/core';
import { Schema } from './schema';
import { getFiles, hasValidAWSConfiguration } from './utils';
import { Uploader } from './uploader';

export default async function deploy(
  context: BuilderContext,
  projectTarget: experimental.workspace.WorkspaceTool,
  buildTarget: string,
  options: Schema,
) {
  if (!context.target) {
    throw new Error('Cannot execute the build target');
  }
  let buildResult;
  if (options.noBuild) {
    context.logger.info(`📦 Skipping build for"${context.target.project}"`);
    buildResult = {
      success: true,
      outputPath: projectTarget.build.options.outputPath,
    };
  } else {
    context.logger.info(`📦 Building "${context.target.project}"`);
    const overrides = {
      // this is an example how to override the workspace set of options
      ...(options.baseHref && { baseHref: options.baseHref }),
    };
    const run = await context.scheduleTarget(
      targetFromTargetString(buildTarget),
      overrides as JsonObject,
    );

    buildResult = await run.result;
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

    if (hasValidAWSConfiguration(options)) {
      context.logger.info('Start uploading files...');
      const uploader = new Uploader(context, options);
      await uploader.upload(files, filesPath, options);
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
}
