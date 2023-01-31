import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { HeadBucketRequest, ObjectIdentifierList, PutObjectRequest } from 'aws-sdk/clients/s3';
import * as mimeTypes from 'mime-types';
import * as fs from 'fs';
import * as path from 'path';
import { Schema } from './schema';
import {
  getAccessKeyId,
  getAwsEndpoint,
  getBucket,
  getRegion,
  gets3ForcePathStyle,
  getSecretAccessKey,
  getSessionToken,
  getSubFolder,
} from './config';

export class Uploader {
  private _context: BuilderContext;
  private _s3: AWS.S3;
  private _bucket: string;
  private _region: string;
  private _subFolder: string;
  private _builderConfig: Schema;

  constructor(context: BuilderContext, builderConfig: Schema) {
    this._context = context;
    this._builderConfig = builderConfig;
    this._bucket = getBucket(this._builderConfig);
    this._region = getRegion(this._builderConfig);
    this._subFolder = getSubFolder(this._builderConfig);

    AWS.config.update({ region: this._region });

    this._s3 = new AWS.S3({
      apiVersion: 'latest',
      s3ForcePathStyle: gets3ForcePathStyle() || false,
      endpoint: getAwsEndpoint(),
      credentials: new AWS.Credentials({
        secretAccessKey: getSecretAccessKey(),
        accessKeyId: getAccessKeyId(),
        sessionToken: getSessionToken(),
      }),
    });
  }

  async upload(files: string[], filesPath: string): Promise<boolean> {
    try {
      if (!this._region || !this._bucket) {
        this._context.logger.error(
          `❌  Looks like you are missing some upload configuration (need region, bucket)`
        );
        return false;
      }

      const params: HeadBucketRequest = {
        Bucket: this._bucket,
      };

      await this._s3
        .headBucket(params)
        .promise()
        .then(() => {
          return this.uploadFiles(files, filesPath);
        })
        .catch((error) => {
          this._context.logger.error(
            `❌  The following error was found during the upload ${error}`
          );
          throw error;
        });
    } catch {
      return false;
    }
    return true;
  }

  uploadFiles(files: string[], filesPath: string) {
    return Promise.all(
      files.map(async (file) => {
        await this.uploadFile(path.join(filesPath, file), file);
      })
    );
  }

  public async uploadFile(localFilePath: string, originFilePath: string) {
    const fileName = path.basename(localFilePath);
    const body = fs.createReadStream(localFilePath);
    body.on('error', function (err) {
      console.log('File Error', err);
    });

    const params: PutObjectRequest = {
      Bucket: this._bucket,
      Key: this._subFolder
        ? `${this._subFolder}/${originFilePath}`
        : originFilePath,
      Body: body,
      ContentType: mimeTypes.lookup(fileName) || undefined,
    };

    await this._s3
      .upload(params)
      .promise()
      .then((file) =>
        this._context.logger.info(
          `Uploaded file "${file.Key}" to ${file.Location}`
        )
      )
      .catch((item) => {
        this._context.logger.error(`Error uploading file: ${item}`);
        throw item;
      });
  }

  public async deleteStaleFiles(localFiles: string[]) {
    const remoteFiles = await this.listObjectKeys();
    const staleFiles = this._subFolder ? localFiles.map((file) => `${this._subFolder}/${file}`) : localFiles;
    const filesToDelete = remoteFiles.filter((file) => !staleFiles.includes(file.Key));

    return this.deleteFiles(filesToDelete);
  }

  public async deleteAllFiles() {
    const remoteFiles = await this.listObjectKeys();

    return this.deleteFiles(remoteFiles);
  }

  private async listObjectKeys() {
    const params = {
      Bucket: this._bucket,
      Prefix: this._subFolder,
    };

    try {
      const data = await this._s3.listObjectsV2(params).promise();
      return data.Contents.map((item) => ({ Key: item.Key }));
    } catch (err) {
      this._context.logger.error(`Error listing files: ${err}`);
    }
  }

  private async deleteFiles(objects: ObjectIdentifierList) {
    if (!objects.length) {
      this._context.logger.info('⚠️  No files to delete');
      return true;
    }

    const params = {
      Bucket: this._bucket,
      Delete: {
        Objects: objects,
      },
    };

    try {
      return this._s3.deleteObjects(params).promise();
    } catch (err) {
      this._context.logger.error(`Error deleting file: ${err}`);
    }
  }
}
