import { MatSpinnerOverlayComponent } from './../../shared/components/mat-spinner-overlay/mat-spinner-overlay.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatSpinnerOverlayComponent,
  ],
})
export class DashboardModule {}
