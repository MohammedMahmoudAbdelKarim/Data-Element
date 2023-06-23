import { DataModelDetailsComponent } from './components/data-model-details/data-model-details.component';
import { DataModelFormComponent } from './components/data-model-form/data-model-form.component';
import { FieldFormComponent } from './components/fields/field-form/field-form.component';
import { DataModelManagementComponent } from './data-model-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DataModelManagementComponent },
  {
    path: 'data-model-template',
    component: DataModelFormComponent,
  },
  {
    path: 'data-model-details',
    component: DataModelDetailsComponent,
  },
  {
    path: 'field-template',
    component: FieldFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataModelManagementRoutingModule {}
