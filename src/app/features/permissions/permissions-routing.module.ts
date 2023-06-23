import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionFormComponent } from './components/permission-form/permission-form.component';
import { PermissionDetailsComponent } from './components/permission-details/permission-details.component';
import { PermissionsComponent } from './permissions.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionsComponent,
  },
  {
    path: 'permission-template',
    component: PermissionFormComponent,
  },
  {
    path: 'permission-details',
    component: PermissionDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsRoutingModule {}
