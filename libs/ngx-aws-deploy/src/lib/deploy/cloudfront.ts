import { BuilderContext } from '@angular-devkit/architect';
import * as AWS from 'aws-sdk';
import { CreateInvalidationRequest } from 'aws-sdk/clients/cloudfront';
import { Schema } from './schema';
import {
  getAccessKeyId,
  getSecretAccessKey,
  getRegion,
  getSubFolder,
  getCfDistributionId
} from './config';

export class CloudFront {
  private _builderConfig: Schema;
  private _context: BuilderContext;

  private _cloudFront: AWS.CloudFront;

  private _cfDistributionId: string;
  private _subFolder: string;
  private _region: string;

  constructor(context: BuilderContext, builderConfig: Schema) {
    this._context = context;
    this._builderConfig = builderConfig;

    this._region = getRegion(this._builderConfig);
    this._cfDistributionId = getCfDistributionId();
    this._subFolder = getSubFolder(this._builderConfig);

    AWS.config.update({ region: this._region });
    this._cloudFront = new AWS.CloudFront({
      apiVersion: 'latest',
      secretAccessKey: getSecretAccessKey(),
      accessKeyId: getAccessKeyId()
    });
  }

  public async invalidate(): Promise<boolean> {
    if (!this._cfDistributionId) {
      this._context.logger.info('⚠️  Skipping invalidation of CloudFront distribution');
      return true;
    }

    const cf_path = this._subFolder ? `/${this._subFolder}/*` : '/*';
    const reference = `ngx-aws-deploy-${new Date().getTime()}`;

    const params : CreateInvalidationRequest = {
      DistributionId: this._cfDistributionId,
      InvalidationBatch: {
        CallerReference: reference,
        Paths: {
          Quantity: 1,
          Items: [
            cf_path
          ]
        }
      }
    };

    this._context.logger.info(`Triggering invalidation of '${cf_path}' from CloudFront distribution ${this._cfDistributionId}`);

    await this._cloudFront
      .createInvalidation(params)
      .promise()
      .then((data) => {
        this._context.logger.info(`Successfully triggered invalidation of '${cf_path}' from CloudFront distribution ${this._cfDistributionId}: current status is '${data.Invalidation.Status}'`);
      })
      .catch((error) => {
        this._context.logger.error(`❌  The following error was found during CloudFront invalidation ${error}`);
        throw error;
      });

    return true;
  }
}
