import * as AWS from 'aws-sdk';
import {
  getAccessKeyId,
  getSecretAccessKey,
  getSessionToken,
  getAwsProfile,
} from '../config';

type Credentials = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken?: string
}
const secretAccessKey = getSecretAccessKey()
const accessKeyId = getAccessKeyId()
const sessionToken = getSessionToken()

if(accessKeyId && secretAccessKey){
  let credentials: Credentials = {
    accessKeyId,
    secretAccessKey
  }
  if(sessionToken){
    credentials = {...credentials, sessionToken}
  }
  AWS.config.credentials = new AWS.Credentials(credentials)
}else{
  AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: getAwsProfile()});
}
export default AWS
