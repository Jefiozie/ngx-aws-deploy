import { BuilderContext } from "@angular-devkit/architect";
import * as AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import * as mimeTypes from 'mime-types';
import * as fs from "fs";
import * as path from "path";
import { Schema } from "./schema";
import {
  getAccessKeyId,
  getBucket,
  getRegion,
  getSecretAccessKey,
} from './config';

export class Uploader {
  private _context: BuilderContext;

  constructor(context: BuilderContext) {
    this._context = context;
  }
  upload(files: string[], filesPath: string, builderConfig: Schema) {
    try {
      const bucket = getBucket(builderConfig);
      const region = getRegion(builderConfig);
      if (!region || !bucket) {
        this._context.logger.error(
          `❌  Looks like you are missing some configuration`
        );
        return;
      }
    } catch {
      return;
    }
    return Promise.all(
      files.map(async file => {
        await this.uploadFile(builderConfig, path.join(filesPath, file), file);
      })
    );
  }
  public async uploadFile(options: Schema, localFilePath: string, originFilePath: string) {
    AWS.config.update({ region: options.region });

    const s3 = new AWS.S3({
      apiVersion: 'latest',
      secretAccessKey: getSecretAccessKey(options),
      accessKeyId: getAccessKeyId(options),
    });
    const fileName = path.basename(localFilePath);
    const body = fs.createReadStream(localFilePath);
    body.on("error", function(err) {
      console.log("File Error", err);
    });
    const params: PutObjectRequest = {
      Bucket: getBucket(options) || '',
      Key: options.subFolder ? `${options.subFolder}/${originFilePath}` : originFilePath,
      Body: body,
      ContentType: mimeTypes.lookup(fileName) || undefined,
    };
    await s3
      .upload(params)
      .promise()
      .then(e =>
        this._context.logger.info(`Uploaded file "${e.Key}" to ${e.Location}`)
      )
      .catch(item =>
        this._context.logger.error(`Error uploading file: ${item.Key}`)
      );
  }
}
