import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionFormComponent } from './components/permission-form/permission-form.component';
import { PermissionDetailsComponent } from './components/permission-details/permission-details.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { PermissionsComponent } from './permissions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from 'src/app/core/core.module';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { PermissionService } from './services/permission.service';

@NgModule({
  declarations: [
    PermissionFormComponent,
    PermissionDetailsComponent,
    PermissionListComponent,
    PermissionsComponent,
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    TableComponent,
    MatIconModule,
    SearchComponent,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    InputComponent,
    MatDialogModule,
    SelectComponent,
    MatInputModule,
    CoreModule,
    EmptyStateComponent,
  ],
  providers: [PermissionService],
})
export class PermissionsModule {}
