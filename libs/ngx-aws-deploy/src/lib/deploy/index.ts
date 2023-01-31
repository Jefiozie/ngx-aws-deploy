import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import * as glob from 'glob';
import { getAccessKeyId, getSecretAccessKey } from './config';
import { CloudFront } from './cloudfront';
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

export default createBuilder(
  async (
    builderConfig: Schema,
    context: BuilderContext
  ): Promise<BuilderOutput> => {
    context.reportStatus('Executing deployment');
    if (!context.target) {
      throw new Error('Cannot deploy the application without a target');
    }
    const buildTarget = {
      name:
        builderConfig.buildTarget ||
        `${context.target.project}:build:production`,
    };

    let targetString = `${context.target.project}:deploy`;
    // Providing `region`, `bucket` and `subFolder` through configuration is actually deprecated.
    // By default `ng add` command doesn't generate any additional configuration inside
    // the builder configuration thus `context.target.configuration` defaults to an empty string.
    if (context.target.configuration) {
      targetString += `:${context.target.configuration}`;
    }

    const { bucket, region, subFolder } = await context.getTargetOptions(
      targetFromTargetString(targetString)
    );

    const deployConfig = { bucket, region, subFolder } as Pick<
      Schema,
      'bucket' | 'region' | 'subFolder'
    >;

    let buildResult: BuilderOutput;
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`);

      const { outputPath } = await context.getTargetOptions(
        targetFromTargetString(buildTarget.name)
      );

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
      const files = getFiles(filesPath);

      if (files.length === 0) {
        throw new Error(
          'Target did not produce any files, or the path is incorrect.'
        );
      }
      if (getAccessKeyId() || getSecretAccessKey()) {
        const uploader = new Uploader(context, deployConfig);

        if (builderConfig.deleteBeforeUpload) {
          context.logger.info('Start removing files before upload...');
          const success = await uploader.deleteAllFiles();
          if (success) {
            context.logger.info('✔ Finished removing files...');
          } else {
            return {
              error: `❌  Error during files removal`,
              success: false,
            };
          }
        }

        context.logger.info('Start uploading files...');
        const success = await uploader.upload(files, filesPath);
        if (success) {
          context.logger.info('✔ Finished uploading files...');

          if (builderConfig.deleteAfterUpload) {
            context.logger.info('Start removing files after upload...');
            const success = await uploader.deleteStaleFiles(files);
            if (success) {
              context.logger.info('✔ Finished removing files...');
            } else {
              return {
                error: `❌  Error during files removal`,
                success: false,
              };
            }
          }

          context.logger.info('Start CloudFront invalidation...');
          const cloudFront = new CloudFront(context, deployConfig);
          const success = await cloudFront.invalidate();
          if (success) {
            context.logger.info('✔ Finished CloudFront invalidation...');
            return { success: true };
          } else {
            context.logger.error(`❌  Error during CloudFront invalidation`);
            return {
              error: `❌  Error during CloudFront invalidation`,
              success: false,
            };
          }
        } else {
          return {
            error: `❌  Error during files upload`,
            success: false,
          };
        }
      } else {
        context.logger.error(`❌  Missing authentication settings for AWS`);
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
