export interface FileUploadOptions {
  disableDelete?: boolean;
  disableDownload?: boolean;
  disableAnchor?: boolean;
  maxFilesLimit?: number;
  maxFileSize?: number;
  maxFilesSize?: number;
  allowedExtensions?: string[];
}
export interface TemplateReferenceOptions {
  showDownload?: boolean;
  disableDownload?: boolean;
}
