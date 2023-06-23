import { TableHeaders } from 'src/app/core/models/table-headers.model';

export const DOMAIN_TABLE_HEADERS: TableHeaders[] = [
  {
    title: 'Domain ID',
    colKey: 'id',
  },
  {
    title: 'Domain Name',
    colKey: 'name',
  },
  {
    title: 'Path',
    colKey: 'path',
    classes: 'fst-italic text-white bg-primary px-3',
  },
];
