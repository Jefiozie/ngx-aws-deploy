import * as glob from 'glob';
import { Schema } from './schema';
import { getAccessKeyId, getSecretAccessKey } from './config';

export function getFiles(filesPath: string) {
  return glob.sync(`**`, {
    ignore: ['.git'],
    cwd: filesPath,
    nodir: true,
  });
}

export function hasValidAWSConfiguration(options: Schema) {
  const accessKey = getAccessKeyId(options);
  const secret = getSecretAccessKey(options);
  return ![accessKey, secret].includes('');
}
