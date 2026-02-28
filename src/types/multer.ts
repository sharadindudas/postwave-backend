interface UploadMiddlewareOptions {
  mimeTypes?: string[];
  maxFileSize?: number;
}

interface SingleUploadConfig {
  type: "single";
  fieldName: string;
}

interface MultipleUploadConfig {
  type: "multiple";
  fieldName: string;
  maxCount?: number;
}

interface FieldsUploadConfig {
  type: "fields";
  fields: { name: string; maxCount?: number }[];
}

type UploadConfig = SingleUploadConfig | MultipleUploadConfig | FieldsUploadConfig;
