import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import * as mime from 'mime';
import { Options } from './Options';

export class Uploader {
    private S3: AWS.S3;
    constructor(accessKeyId: string,
        secretAccessKey: string) {
        this.S3 = new AWS.S3({ apiVersion: '2006-03-01', accessKeyId, secretAccessKey });
    }
    upload(files: string[], builderConfig: Options, context: BuilderContext) {
        try {

            const { region, bucket } = builderConfig;
            if (!region || !bucket) {
                context.logger.error(`❌  Looks like you are missing some configuration`);
                return;
            }
        } catch{
            return;
        }
        AWS.config.update({ region: builderConfig.region });
        files.map(async (file) => {
            context.logger.info(`Uploading: ${file}`)
            await this.uploadFile(builderConfig, file)
        })
    }
    public async uploadFile(options: Options, localFilePath: string, remotePath: string = '/'): Promise<string> {
        const body = fs.createReadStream(localFilePath);
        const params: PutObjectRequest = {
            Bucket: options.bucket,
            Key: remotePath.replace(/\\/g, '/'),
            Body: body,
            ContentType: mime.getType(localFilePath)?.toString(),
        };

        return new Promise((resolve, reject) => {
            this.S3.upload(params, (err, data) => {
                if (err) {
                    console.log("Error", err);
                    reject()
                } if (data) {
                    resolve(params.Key)
                    console.log("Upload Success", data.Location);
                }
            });
        });
    }
}