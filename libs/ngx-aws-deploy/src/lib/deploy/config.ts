import { Schema } from './schema';

export const getAccessKeyId = (): string => {
  return process.env.NG_DEPLOY_AWS_ACCESS_KEY_ID as string || process.env.AWS_ACCESS_KEY_ID as string;
};

export const getSecretAccessKey = (): string => {
  return process.env.NG_DEPLOY_AWS_SECRET_ACCESS_KEY as string || process.env.AWS_SECRET_ACCESS_KEY as string;
};

export const getSessionToken = (): string => {
  return process.env.NG_DEPLOY_AWS_SESSION_TOKEN as string || process.env.AWS_SESSION_TOKEN as string;
};

export const getBucket = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_BUCKET || (builderConfig.bucket as string);
};

export const getRegion = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_REGION || (builderConfig.region as string) || process.env.AWS_DEFAULT_REGION;
};

export const getSubFolder = (builderConfig: Schema): string => {
  return process.env.NG_DEPLOY_AWS_SUB_FOLDER || (builderConfig.subFolder as string);
};
