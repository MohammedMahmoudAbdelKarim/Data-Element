import { PaginationComponent } from './../../shared/components/pagination/pagination.component';
import { FileUploaderComponent } from './../../shared/components/file-uploader/file-uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataModelManagementRoutingModule } from './data-model-management-routing.module';
import { DataModelManagementComponent } from './data-model-management.component';
import { DataModelListComponent } from './components/data-model-list/data-model-list.component';
import { DataModelFormComponent } from './components/data-model-form/data-model-form.component';
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
import { DataModelDetailsComponent } from './components/data-model-details/data-model-details.component';
import { FieldsListComponent } from './components/fields/fields-list/fields-list.component';
import { FieldFormComponent } from './components/fields/field-form/field-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { DataModelService } from './services/data-model.service';
import { DomainService } from '../domain-management/services/domain.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UploadModelComponent } from './components/upload-model/upload-model.component';
import { HistoryLogComponent } from './components/history-log/history-log.component';

@NgModule({
  declarations: [
    DataModelManagementComponent,
    DataModelListComponent,
    DataModelFormComponent,
    DataModelDetailsComponent,
    FieldsListComponent,
    FieldFormComponent,
    UploadModelComponent,
    HistoryLogComponent,
  ],
  imports: [
    CommonModule,
    DataModelManagementRoutingModule,
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
    FileUploaderComponent,
    CoreModule,
    MatSlideToggleModule,
    PaginationComponent,
  ],
  providers: [DataModelService, DomainService, DatePipe],
})
export class DataModelManagementModule {}
