import { TableHeaders } from 'src/app/core/models/table-headers.model';

export const DATA_MODEL_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Data Model ID',
    colKey: 'id',
  },
  {
    title: 'Data Model Name',
    colKey: 'name',
  },
  {
    title: 'Key',
    colKey: 'key',
  },
  {
    title: 'Path',
    colKey: 'path',
    classes: 'fst-italic text-white bg-primary px-3',
  },
  {
    title: 'Transformer',
    colKey: 'transformer',
  },
];

export const FIELDS_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Field Name',
    colKey: 'name',
  },
  {
    title: 'Last Update Date',
    colKey: 'lastModifiedAt',
  },
];

export const HISTORY_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Model Type',
    colKey: 'modeType',
    classes: 'fw-bolder',
  },
  {
    title: 'Status',
    colKey: 'status',
    classes: 'status',
  },
  {
    title: 'Update Type',
    colKey: 'updateType',
  },
  {
    title: 'Upload Date',
    colKey: 'uploadedDateTime',
  },
  {
    title: 'Uploader Email',
    colKey: 'uploaderEmail',
  },
];
