import { AllowedActions } from './allowed-actions.model';
import { TableHeaders } from './table-headers.model';
export interface DataSourceModel {
  columns: TableHeaders[];
  columnsHeaders: string[];
  data: any[];
  allowedActions?: AllowedActions[];
  pagination: {
    limit: number;
    offset: number;
    totalPages?: number;
    totalElements?: number;
  };
}
