export interface Schema {
  project?: Project;
  region?: Region;
  bucket?: Bucket;
  subFolder?: Bucket;
}

export interface Bucket {
  type?: string;
  description?: string;
  'x-prompt'?: string;
}

export interface Project {
  type?: string;
  description?: string;
}

export interface Region {
  type?: string;
  description?: string;
  'x-prompt'?: XPrompt;
}

export interface XPrompt {
  message?: string;
  type?: string;
  items?: Item[];
}

export interface Item {
  value?: string;
  label?: string;
}
