import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import * as mime from 'mime';
import * as path from 'path';
import { Options } from './Options';

export class Uploader {
    private S3: AWS.S3;
    constructor(accessKeyId: string,
        secretAccessKey: string) {
        this.S3 = new AWS.S3({ accessKeyId, secretAccessKey });
    }
    async upload(files: string[], filesPath: string, builderConfig: Options, context: BuilderContext) {
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
        await files.map(async (file) => {
            const result = await this.uploadFile(builderConfig, path.join(filesPath, file))
            console.log(result.Location)
        })
    }
    public async uploadFile(options: Options, localFilePath: string, remotePath: string = '/'): Promise<AWS.S3.ManagedUpload.SendData> {
        const body = fs.createReadStream(localFilePath);
        body.on('error', function (err) {
            console.log('File Error', err);
        });
        const params: PutObjectRequest = {
            Bucket: options.bucket,
            Key: path.basename(localFilePath),
            Body: body,
            ContentType: mime.getType(localFilePath)?.toString(),
        };
        return this.S3.upload(params).promise();
    };
}