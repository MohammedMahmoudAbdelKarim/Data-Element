import { TableHeaders } from 'src/app/core/models/table-headers.model';

export const CLIENT_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Client Name',
    colKey: 'name',
  },
  {
    title: 'Status',
    colKey: 'status',
    classes: 'status text-capitalize',
  },
];
