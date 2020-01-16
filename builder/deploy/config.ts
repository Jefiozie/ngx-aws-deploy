import { Schema } from './schema';

export const getAccessKeyId = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_ACCESS_KEY_ID || builderConfig.accessKeyId;
};

export const getSecretAccessKey = (builderConfig: Schema): string => {
  return (
    process.env.NG_DEPLOY_AWS_SECRET_ACCESS_KEY || builderConfig.secretAccessKey
  );
};

export const getBucket = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_BUCKET || builderConfig.bucket;
};

export const getRegion = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_REGION || builderConfig.region;
};
