export interface DataModelFormDataModel {
  name?: string;
  fields: FieldsFormData[];
  key?: string;
  transformer?: string;
  collection?: string;
  path?: string;
  id?: number;
  modelGroupId?: number;
}

export interface FieldsFormData {
  name: string;
  type: string;
  required: boolean;
  numberRange?: string;
  stringLength?: number;
  builtInFormat?: string;
  numberMax?: number;
  numberMin?: number;
}

export interface HistoryLog {
  id?: number;
  startDate?: string;
  endDate?: string;
  modeType?: string;
  status?: string;
  modelId?: string;
  uploaderEmail?: string;
  uploadedDateTime?: string;
  updateType?: string;
  jobRunnerEmail?: string;
}
