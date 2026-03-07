export interface UploadMiddlewareOptions {
  mimeTypes?: string[];
  maxFileSize?: number;
}

export interface SingleUploadConfig {
  type: "single";
  fieldName: string;
}

export interface MultipleUploadConfig {
  type: "multiple";
  fieldName: string;
  maxCount?: number;
}

export interface FieldsUploadConfig {
  type: "fields";
  fields: { name: string; maxCount?: number }[];
}

export type UploadConfig = SingleUploadConfig | MultipleUploadConfig | FieldsUploadConfig;
