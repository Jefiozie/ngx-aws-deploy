import { Schema } from './schema';

export const getAccessKeyId = (builderConfig: Schema): string => {
  return (
    process.env.NG_DEPLOY_AWS_ACCESS_KEY_ID ||
    (builderConfig.accessKeyId as string)
  );
};

export const getSecretAccessKey = (builderConfig: Schema): string => {
  return (
    process.env.NG_DEPLOY_AWS_SECRET_ACCESS_KEY ||
    (builderConfig.secretAccessKey as string)
  );
};

export const getBucket = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_BUCKET || (builderConfig.bucket as string);
};

export const getRegion = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_REGION || (builderConfig.region as string);
};
