import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementRoutingModule } from './client-management-routing.module';
import { ClientManagementComponent } from './client-management.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from 'src/app/core/core.module';
import { ClientService } from './services/client.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    ClientManagementComponent,
    ClientFormComponent,
    ClientDetailsComponent,
    ClientListComponent,
  ],
  imports: [
    CommonModule,
    ClientManagementRoutingModule,
    TableComponent,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    SearchComponent,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
    InputComponent,
    MatDialogModule,
    SelectComponent,
    MatInputModule,
    CoreModule,
    MatExpansionModule,
    MatChipsModule,
    ClipboardModule,
    EmptyStateComponent,
  ],
  providers: [ClientService],
})
export class ClientManagementModule {}
