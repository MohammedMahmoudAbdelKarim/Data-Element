export interface DocumentFile {
  id?: string;
  name?: string;
  fileName?: string;
  extension?: string;
  size?: number | string;
  fileSize?: string;
  content?: string;
  url?: string;
  uploadedDate?: string;
  lang?: string;
  description?: string;
  tags?: string[];
  isFileDesktop?: boolean;
}
