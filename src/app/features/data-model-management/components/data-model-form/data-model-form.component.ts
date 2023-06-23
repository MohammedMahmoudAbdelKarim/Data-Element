import { Subscription } from 'rxjs';
import { FileUploadOptions } from './../../../../shared/models/uploader-options.model';
import { DATA_MODEL_FILE_UPLOAD_OPTIONS } from './../../constants/data-model.constant';
import { CustomValidations } from './../../../../core/validations/custom-validation';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/app/features/domain-management/services/domain.service';
import {
  CUSTOM_FILTER_LIMIT,
  DEFAULT_FILTER_CRITERIA,
} from 'src/app/core/constants';
import { DomainModel } from 'src/app/features/domain-management/models/domain.model';
import { DataModelService } from '../../services/data-model.service';
import { FieldModel } from '../../models/fields.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DataModelFormDataModel } from '../../models/data-model.model';

@Component({
  selector: 'app-data-model-form',
  templateUrl: './data-model-form.component.html',
})
export class DataModelFormComponent implements OnInit {
  private readonly _subscription$: Subscription = new Subscription();
  public dataModelForm!: FormGroup;
  public fieldsList!: FieldModel[];
  public domainList!: DomainModel[];
  public transformersList!: string[];
  public dataModelFileUploadOptions: FileUploadOptions =
    DATA_MODEL_FILE_UPLOAD_OPTIONS;
  public modelId!: number;

  constructor(
    private _fb: FormBuilder,
    private _domainService: DomainService,
    private _dataModelService: DataModelService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _rotuer: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllDomains();
    this.getAllTransformers();
    this.modelId = +this._route.snapshot.queryParams['id'];
    if (this.modelId) {
      this.getModelDetails();
    }
  }

  public initForm(): void {
    this.dataModelForm = this._fb.group({
      name: this._fb.control(null, [
        Validators.required,
        Validators.maxLength(50),
        CustomValidations.disallowedWhiteSpace,
        CustomValidations.disallowedSpecialCharacters,
      ]),
      modelGroupId: this._fb.control('', [Validators.required]),
      key: this._fb.control('', [Validators.required]),
      collection: this._fb.control('', [Validators.required]),
      fields: this._fb.control([], [Validators.required]),
      transformer: this._fb.control('', [Validators.required]),
      path: this._fb.control(null, [
        Validators.required,
        CustomValidations.pathPattern,
      ]),
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.dataModelForm?.controls[controlName];
  }

  public getModelDetails() {
    this._subscription$.add(
      this._dataModelService.getByID(this.modelId).subscribe({
        next: (res) => {
          this.patchModelForm(res);
        },
      })
    );
  }

  public patchModelForm(data: DataModelFormDataModel) {
    this.dataModelForm.patchValue({
      ...data,
    });
    this.fieldsList = data?.fields;
  }

  public getAllDomains(): void {
    this._subscription$.add(
      this._domainService
        .list({
          limit: CUSTOM_FILTER_LIMIT,
          offset: DEFAULT_FILTER_CRITERIA.offset,
        })
        .subscribe({
          next: (res) => {
            this.domainList = res['payload'];
          },
        })
    );
  }

  public onSelectFile(files: File[]): void {
    if (files.length) {
      const file = files[0];
      const FORM_DATA = new FormData();
      FORM_DATA.append('file', file);
      this.getAllParsedFields(FORM_DATA);
    }
  }

  public getAllParsedFields(formData: FormData) {
    this._subscription$.add(
      this._dataModelService.uploadSample(formData).subscribe({
        next: (res: FieldModel[] | undefined) => {
          this.fieldsList = res ?? [];
        },
      })
    );
  }

  public getAllTransformers() {
    this._subscription$.add(
      this._dataModelService.getTransformers().subscribe({
        next: (res) => {
          this.transformersList = res;
        },
      })
    );
  }

  public onSubmit(): void {
    const collectionControl = this.getControl('collection');
    collectionControl.setValue(collectionControl.value.toLowerCase());
    const modelData = {
      ...this.dataModelForm.value,
      collection: collectionControl.value,
    };
    const request$ = this.modelId
      ? this._dataModelService.update(this.modelId, modelData)
      : this._dataModelService.create(modelData);
    this._subscription$.add(
      request$.subscribe(() => {
        const message = this.modelId ? 'Updated' : 'Created';
        this._toastr.success(
          `${message}!`,
          `Domain has been ${message.toLowerCase()} successfully`
        );
        this._rotuer.navigateByUrl('/data-elements/data-model-management');
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
