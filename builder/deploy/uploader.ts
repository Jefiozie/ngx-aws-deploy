import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as mimeTypes from 'mime-types';
import * as fs from 'fs';
import * as path from 'path';
import { Schema } from './schema';
import {
  getAccessKeyId,
  getBucket,
  getRegion,
  getSecretAccessKey,
} from './config';

export class Uploader {
  private readonly _options: Schema;
  private readonly _context: BuilderContext;

  private readonly _s3: AWS.S3;

  constructor(options: Schema, context: BuilderContext) {
    AWS.config.update({ region: options.region });

    this._s3 = new AWS.S3({
      apiVersion: 'latest',
      secretAccessKey: getSecretAccessKey(options),
      accessKeyId: getAccessKeyId(options),
    });

    this._options = options;
    this._context = context;
  }

  upload(files: string[], filesPath: string) {
    try {
      const bucket = getBucket(this._options);
      const region = getRegion(this._options);
      if (!region || !bucket) {
        this._context.logger.error(
          `❌  Looks like you are missing some configuration`,
        );
        return;
      }
    } catch {
      return;
    }
    return Promise.all(
      files.map(async file => {
        await this.uploadFile(path.join(filesPath, file), file);
      }),
    );
  }
  public async uploadFile(localFilePath: string, originFilePath: string) {
    const fileName = path.basename(localFilePath);
    const body = fs.createReadStream(localFilePath);

    body.on('error', function(err) {
      console.log('File Error', err);
    });

    const params: PutObjectRequest = {
      Bucket: getBucket(this._options) || '',
      Key: this._options.subFolder
        ? `${this._options.subFolder}/${originFilePath}`
        : originFilePath,
      Body: body,
      ContentType: mimeTypes.lookup(fileName) || undefined,
    };

    await this._s3
      .upload(params)
      .promise()
      .then(e =>
        this._context.logger.info(`Uploaded file "${e.Key}" to ${e.Location}`),
      )
      .catch(item => {
        this._context.logger.error(
          `Error uploading file '${fileName}':\n  ${item}\n`,
        );
      });
  }
}
