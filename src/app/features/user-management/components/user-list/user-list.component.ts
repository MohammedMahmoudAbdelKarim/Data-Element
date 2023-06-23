import { Component, Input } from '@angular/core';
import { DATA_MODEL_TABLE_HEADERS } from 'src/app/features/data-model-management/constants/data-model-table-header';

@Component({
  selector: 'de-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() dataSource = {
    columns: [...DATA_MODEL_TABLE_HEADERS, { title: '', colKey: 'actions' }],
    data: [
      {
        id: '#MIIDW5656L',
        name: 'Domain_Name',
        dataModel: 5,
        lastModifiedAt: '28 March 2023',
      },
    ],
    columnsHeaders: [
      ...DATA_MODEL_TABLE_HEADERS,
      { title: '', colKey: 'actions' },
    ].map((col) => col.colKey),
    allowedActions: [
      {
        label: 'Delete',
        icon: 'delete',
        action: 'DELETE',
      },
      {
        label: 'Edit',
        icon: 'edit',
        action: 'EDIT',
      },
    ],
    pagination: {
      limit: 10,
      offset: 0,
      totalElements: 16,
      totalPages: 2,
    },
  };
}
