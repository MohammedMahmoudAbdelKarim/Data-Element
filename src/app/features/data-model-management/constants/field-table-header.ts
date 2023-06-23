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
    title: 'Number Range',
    colKey: 'numberRange',
  },
  {
    title: 'String Length',
    colKey: 'stringLength',
  }, {
    title: 'Built-In Format',
    colKey: 'builtInFormat',
  }, {
    title: 'Min Number',
    colKey: 'numberMin',
  }, {
    title: 'Max Number',
    colKey: 'numberMax',
  }
];
