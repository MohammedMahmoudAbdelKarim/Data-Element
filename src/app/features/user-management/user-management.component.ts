import { Component } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DATA_MODEL_TABLE_HEADERS } from '../data-model-management/constants/data-model-table-header';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  constructor(public dialog: MatDialog) {}

  dataSource = {
    columns: [...DATA_MODEL_TABLE_HEADERS, { title: '', colKey: 'actions' }],
    data: [],
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
  public openDomainForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent);
    const SUB = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
      SUB.unsubscribe();
    });
  }
}
