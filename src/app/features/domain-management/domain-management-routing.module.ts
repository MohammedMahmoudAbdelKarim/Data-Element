import { DomainManagementComponent } from './domain-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';

const routes: Routes = [
  { path: '', component: DomainManagementComponent },
  {
    path: 'domain-details',
    component: DomainDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainManagementRoutingModule {}
