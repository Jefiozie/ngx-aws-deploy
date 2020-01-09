export interface Options {
  noBuild: boolean;
  mode: 'production';
  configuration: {
    region: string;
    bucket: string;
  };
}
