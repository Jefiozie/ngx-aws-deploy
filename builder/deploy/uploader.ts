import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import * as mime from 'mime';
import { Options } from './Options';

export class Uploader {
    private S3: AWS.S3;
    constructor() {
        this.S3 = new AWS.S3({ apiVersion: '2006-03-01' });
    }
    upload(files: string[], builderConfig: Options, context: BuilderContext) {
        AWS.config.update({ region: builderConfig.configuration.region });
        files.map(file => {
            context.logger.info(`Uploading: ${file}`)
            this.uploadFile(builderConfig, file)
        })
    }
    public uploadFile(options: Options, localFilePath: string, remotePath: string = ''): Promise<string> {
        const body = fs.createReadStream(localFilePath);
        const params: PutObjectRequest = {
            Bucket: options.configuration.bucket,
            Key: remotePath.replace(/\\/g, '/'),
            Body: body,
            ContentType: mime.getType(localFilePath)?.toString(),
        };

        return new Promise(resolve => {
            this.S3.upload(params, err => {
                if (err) console.error('err:', err);
                resolve(params.Key);
            });
        });
    }
}