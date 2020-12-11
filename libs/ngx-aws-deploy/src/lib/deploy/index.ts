import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import * as glob from 'glob';
import { getAccessKeyId, getSecretAccessKey } from './config';
import { Schema } from './schema';
import { Uploader } from './uploader';

const getFiles = (filesPath: string) => {
  return glob.sync(`**`, {
    ignore: ['.git'],
    cwd: filesPath,
    nodir: true,
    // Directory and file names may contain `.` at the beginning,
    // e.g. `.well-known/apple-app-site-association`.
    dot: true,
  });
};

export default createBuilder<any>(
  async (builderConfig: Schema, context: BuilderContext): Promise<any> => {
    context.reportStatus('Executing deployment');
    if (!context.target) {
      throw new Error('Cannot deploy the application without a target');
    }
    const buildTarget = {
      name:
        builderConfig.buildTarget ||
        `${context.target.project}:build:production`,
    };

    let deployOptions = await context.getTargetOptions(
      targetFromTargetString(`${context.target.project}:deploy:production`)
    );
    const deployConfig = {
      bucket: deployOptions.bucket,
      region: deployOptions.region,
    } as any;
    let buildResult: BuilderOutput;
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`);
      
      const outputPath =
      context.target.project[context.target.target].options.outputPath;
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
        targetFromTargetString(buildTarget.name),
        {
          ...overrides,
        }
        );
        
        buildResult = await build.result;
        context.logger.info(`✔ Build Completed`);
      }
      if (buildResult.success) {
        const filesPath = buildResult.outputPath as string;
        const files = await getFiles(filesPath);

      if (files.length === 0) {
        throw new Error(
          'Target did not produce any files, or the path is incorrect.'
        );
      }
      if (getAccessKeyId(deployConfig) || getSecretAccessKey(deployConfig)) {
        context.logger.info('Start uploading files...');
        const uploader = new Uploader(context, deployConfig);
        const success = await uploader.upload(files, filesPath);
        if (success) {
          context.logger.info('✔ Finished uploading files...');
          return { success: true };
        } else {
          return {
            error: `❌  Error during files upload`,
            success: false,
          };
        }
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
);
