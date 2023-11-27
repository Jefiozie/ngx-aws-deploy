export type GlobFileUploadParams = { glob: string } & PutObjectRequest;
export type GlobFileUploadParamsList = Array<GlobFileUploadParams>;
export interface Schema {
  configuration?: string;
  buildTarget?: string;
  noBuild?: string;
  baseHref?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  region?: string;
  bucket?: string;
  subFolder?: string;
  cfDistributionId?: string;
  deleteAfterUpload?: boolean;
  deleteBeforeUpload?: boolean;
  globFileUploadParamsList?: GlobFileUploadParamsList;
}
