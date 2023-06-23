import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';

@NgModule({
  declarations: [UserManagementComponent, UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    SearchComponent,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    MatDialogModule,
    TableComponent,
    SelectComponent,
  ],
})
export class UserManagementModule {}
