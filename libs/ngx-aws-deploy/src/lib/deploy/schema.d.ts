export interface Schema {
  configuration?: Configuration;
  noBuild?: NoBuild;
  baseHref?: AccessKeyID;
  accessKeyId?: AccessKeyID;
  secretAccessKey?: AccessKeyID;
  region?: AccessKeyID;
  bucket?: AccessKeyID;
  subFolder?: AccessKeyID;
}

export interface AccessKeyID {
  type?: string;
  description?: string;
}

export interface Configuration {
  type?: string;
  default?: string;
  description?: string;
  alias?: string;
}

export interface NoBuild {
  type?: string;
  default?: boolean;
  description?: string;
}
