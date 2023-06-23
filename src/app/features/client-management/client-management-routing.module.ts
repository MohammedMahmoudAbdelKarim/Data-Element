import { ClientFormComponent } from './components/client-form/client-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagementComponent } from './client-management.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClientManagementComponent,
  },
  {
    path: 'client-template',
    component: ClientFormComponent,
  },
  {
    path: 'client-details',
    component: ClientDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientManagementRoutingModule {}
