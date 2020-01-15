import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import * as path from 'path';
import { Schema } from './schema';

export class Uploader {
  private _context: BuilderContext;

  constructor(context: BuilderContext) {
    this._context = context;
  }
  upload(files: string[], filesPath: string, builderConfig: Schema) {
    try {
      const { region, bucket } = builderConfig;
      if (!region || !bucket) {
        this._context.logger.error(
          `❌  Looks like you are missing some configuration`,
        );
        return;
      }
    } catch {
      return;
    }
    const { region, bucket, subFolder } = builderConfig;
    const { secretAccessKey, accessKeyId } = this.getAuthTokens(builderConfig);
    return Promise.all(
      files.map(async file => {
        await this.uploadFile(
          {
            secretAccessKey,
            accessKeyId,
            region,
            bucket,
            subFolder,
          },
          path.join(filesPath, file),
        );
      }),
    );
  }
  private async uploadFile(
    options: {
      secretAccessKey: string;
      accessKeyId: string;
      region: string | undefined;
      bucket: string | undefined;
      subFolder: string | undefined;
    },
    localFilePath: string,
  ) {
    AWS.config.update({ region: options.region });
    const s3 = new AWS.S3({
      apiVersion: 'latest',
      secretAccessKey: options.secretAccessKey,
      accessKeyId: options.accessKeyId,
    });
    const fileName = path.basename(localFilePath);
    const body = fs.createReadStream(localFilePath);
    body.on('error', function(err) {
      console.log('File Error', err);
    });
    const params: PutObjectRequest = {
      Bucket: options.bucket || '',
      Key: options.subFolder ? `${options.subFolder}/${fileName}` : fileName,
      Body: body,
    };
    await s3
      .upload(params)
      .promise()
      .then(e =>
        this._context.logger.info(`Uploaded file "${e.Key}" to ${e.Location}`),
      )
      .catch(item =>
        this._context.logger.error(`Error uploading file: ${item.Key}`),
      );
  }

  private getAuthTokens(options: Schema) {
    try {
      const authFile = fs.readFileSync('aws.json', { encoding: 'utf-8' });
      const { secretAccessKey, accessKeyId } = JSON.parse(authFile)[
        (this._context.target as any).project
      ];
      return { secretAccessKey, accessKeyId };
    } catch (error) {
      this._context.logger.warn(
        `❌  Missing authentication settings from aws.json file, checking angular.json`,
      );
      const { secretAccessKey, accessKeyId } = options;
      if (!secretAccessKey || !accessKeyId) {
        this._context.logger.error(
          `❌  Missing authentication settings for AWS`,
        );
        throw new Error('Missing authentication settings for AWS');
      }
      return { secretAccessKey, accessKeyId };
    }
  }
}
