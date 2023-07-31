import { TableHeaders } from 'src/app/core/models/table-headers.model';

export const FIELD_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Name',
    colKey: 'name',
  },
  {
    title: 'Type',
    colKey: 'type',
  },
  {
    title: 'Required',
    colKey: 'required',
  },
  {
    title: 'Max Length',
    colKey: 'maxLength',
  },
  {
    title: 'Min Length',
    colKey: 'minLength',
  },
  {
    title: 'Maximum',
    colKey: 'maximum',
  },
  {
    title: 'Minimum',
    colKey: 'minimum',
  },
  {
    title: 'Built-In Format',
    colKey: 'builtInFormat',
  },
  {
    title: 'Exclusive Maximum',
    colKey: 'exclusiveMaximum',
  },
  {
    title: 'Exclusive Minimum',
    colKey: 'exclusiveMinimum',
  },
];
