import { SelectComponent } from './../../shared/components/form-field/select/select.component';
import { InputComponent } from './../../shared/components/form-field/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './../../shared/components/search/search.component';
import { TableComponent } from './../../shared/components/table/table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainManagementRoutingModule } from './domain-management-routing.module';
import { DomainManagementComponent } from './domain-management.component';
import { DomainsListComponent } from './components/domains-list/domains-list.component';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';
import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { DomainService } from './services/domain.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
@NgModule({
  declarations: [
    DomainManagementComponent,
    DomainsListComponent,
    DomainDetailsComponent,
    DomainFormComponent,
  ],
  imports: [
    CommonModule,
    DomainManagementRoutingModule,
    TableComponent,
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
    SelectComponent,
    CoreModule,
    MatFormFieldModule,
    MatChipsModule,
    ClipboardModule,
  ],
  providers: [DomainService],
})
export class DomainManagementModule {}
