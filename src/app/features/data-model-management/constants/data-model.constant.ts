import { FileUploadOptions } from './../../../shared/models/uploader-options.model';
export const DATA_MODEL_FILE_UPLOAD_OPTIONS: FileUploadOptions = {
  maxFileSize: 5,
  allowedExtensions: ['.json'],
  maxFilesLimit: 1,
  disableDelete: true,
  disableAnchor: false,
  disableDownload: false,
};
