import { TableHeaders } from 'src/app/core/models/table-headers.model';

export const PERMISSION_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Client Name',
    colKey: 'clientName',
  },
  {
    title: 'Model Name',
    colKey: 'modelName',
  },
  {
    title: 'Access Level',
    colKey: 'accessLevel',
    classes: 'status',
  },
];
