import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataModelService } from '../../services/data-model.service';
import { Subscription } from 'rxjs';
import { DATA_MODEL_UPLOAD_OPTIONS } from '../../constants/data-model.constant';
import { FileUploadOptions } from 'src/app/shared/models/uploader-options.model';
import { OPERATION_TYPES } from '../../constants/data-model-operation-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-upload-model',
  templateUrl: './upload-model.component.html',
})
export class UploadModelComponent implements OnInit {
  public uploadModelForm!: FormGroup;
  private readonly _subscription$: Subscription = new Subscription();
  public modelId!: number;
  public operationType: string[] = OPERATION_TYPES;
  public fileContent!: File;
  public dataModelFileUploadOptions: FileUploadOptions =
    DATA_MODEL_UPLOAD_OPTIONS;

  constructor(
    private _dataModelService: DataModelService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _rotuer: Router
  ) {}

  ngOnInit(): void {
    this.modelId = +this._route.snapshot.queryParams['id'];
    this.initForm();
  }
  public initForm(): void {
    this.uploadModelForm = this._fb.group({
      type: this._fb.control(null, [Validators.required]),
      file: this._fb.control(null),
    });
  }
  public getControl(controlName: string): AbstractControl {
    return this.uploadModelForm?.controls[controlName];
  }
  public onSelectFile(files: File[]): void {
    if (files.length) {
      this.fileContent = files[0];
    }
  }

  public onSubmitUploadModel(): void {
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', this.fileContent);
    FORM_DATA.append('modeType', this.uploadModelForm.get('type')?.value);

    this._subscription$.add(
      this._dataModelService
        .uploadModelFile(this.modelId, FORM_DATA)
        .subscribe({
          next: (res) => {
            this._toastr.success(
              `Data model file has been uploaded successfully`,
              `Uploaded!`
            );
            this._rotuer.navigateByUrl('/data-elements/data-model-management');
          },
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
