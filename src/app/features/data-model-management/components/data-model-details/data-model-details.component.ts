import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldFormComponent } from '../fields/field-form/field-form.component';
import { Subscription } from 'rxjs';
import { FieldModel } from '../../models/fields.model';
import { DataModelService } from '../../services/data-model.service';
import { ActivatedRoute } from '@angular/router';
import { DataModelFormDataModel } from '../../models/data-model.model';
import { FileUploadOptions } from 'src/app/shared/models/uploader-options.model';
import { DATA_MODEL_UPLOAD_OPTIONS } from '../../constants/data-model.constant';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'de-data-model-details',
  templateUrl: './data-model-details.component.html',
})
export class DataModelDetailsComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public modelId!: number;
  public modelDetails!: DataModelFormDataModel;
  public dataModelFileUploadOptions: FileUploadOptions =
    DATA_MODEL_UPLOAD_OPTIONS;
  public uploadModelForm!: FormGroup;
  @Input() fieldList!: FieldModel[];

  constructor(
    public dialog: MatDialog,
    private _dataModelService: DataModelService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.modelId = +this._route.snapshot.queryParams['id'];
    this.getDataModelDetails();
    this.initForm();
  }

  public initForm(): void {
    this.uploadModelForm = this._fb.group({
      type: this._fb.control(null),
      file: this._fb.control(null),
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.uploadModelForm?.controls[controlName];
  }

  public getDataModelDetails() {
    this._subscription$.add(
      this._dataModelService.getByID(this.modelId).subscribe({
        next: (res) => {
          this.modelDetails = res;
        },
      })
    );
  }

  public onSelectFile(files: File[]): void {
    if (files.length) {
      const file = files[0];
      const FORM_DATA = new FormData();
      FORM_DATA.append('file', file);
    }
  }

  public onCreateNewField(): void {
    const dialogRef = this.dialog.open(FieldFormComponent);
    this._subscription$.add(
      dialogRef.afterClosed().subscribe({
        next: (isCreated: boolean) => {
          if (isCreated) {
            this.getDataModelDetails();
          }
        },
      })
    );
  }

  public onSubmitUploadModel(): void {}

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
