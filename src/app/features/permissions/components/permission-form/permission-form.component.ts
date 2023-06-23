import { ClientModel } from './../../../client-management/models/client.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {
  CUSTOM_FILTER_LIMIT,
  DEFAULT_FILTER_CRITERIA,
} from 'src/app/core/constants';
import { ClientService } from 'src/app/features/client-management/services/client.service';
import { DataModelFormModel } from 'src/app/features/data-model-management/models/data-model-template.model';
import { FieldModel } from 'src/app/features/data-model-management/models/fields.model';
import { DataModelService } from 'src/app/features/data-model-management/services/data-model.service';
import { DomainModel } from 'src/app/features/domain-management/models/domain.model';
import { DomainService } from 'src/app/features/domain-management/services/domain.service';
import { PermissionService } from '../../services/permission.service';
import { PermissionModel } from '../../models/permission.model';
import { ACCESS_LEVEL } from '../../constants/access-levet.constant';
import { PermissionFormModel } from '../../models/permission-template.model';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
})
export class PermissionFormComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public permissionForm!: PermissionFormModel;
  public domainsList!: DomainModel[];
  public modelsList!: DataModelFormModel[];
  public fieldsList!: FieldModel[] | undefined;
  public accessLevelList: Record<string, string>[] = ACCESS_LEVEL;
  public clientList!: ClientModel[];
  public permissionId!: number;

  constructor(
    private _fb: FormBuilder,
    private _clientService: ClientService,
    private _toastr: ToastrService,
    private _domainService: DomainService,
    private _dataModelService: DataModelService,
    private _route: ActivatedRoute,
    private _permissionService: PermissionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllClients();
    this.getAllDomains();
    this.getAllModels();
    this.permissionId = +this._route.snapshot.queryParams['id'];
    if (this.permissionId) {
      this.getPermissionDetails();
    }
  }

  public initForm(): void {
    this.permissionForm = this._fb.group({
      domain: this._fb.control(null, [Validators.required]),
      modelId: this._fb.control(null, [Validators.required]),
      clientId: this._fb.control(null, [Validators.required]),
      fieldsId: this._fb.control([], [Validators.required]),
      accessLevel: this._fb.control(null, [Validators.required]),
      ratePerHour: this._fb.control(null),
      ratePerDay: this._fb.control(null),
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.permissionForm?.controls[controlName];
  }

  public getAllClients(): void {
    this._subscription$.add(
      this._clientService
        .list({
          limit: CUSTOM_FILTER_LIMIT,
          offset: DEFAULT_FILTER_CRITERIA.offset,
        })
        .subscribe({
          next: (res) => {
            this.clientList = res['payload'];
          },
        })
    );
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
            this.domainsList = res['payload'];
          },
        })
    );
  }

  public getAllModels(): void {
    this._subscription$.add(
      this._dataModelService
        .list({
          limit: CUSTOM_FILTER_LIMIT,
          offset: DEFAULT_FILTER_CRITERIA.offset,
        })
        .subscribe({
          next: (res) => {
            this.modelsList = res['payload'];
          },
        })
    );
  }

  public getFieldsByModelId(modelID: number): void {
    this._subscription$.add(
      this._dataModelService.getByID(modelID).subscribe({
        next: (res) => {
          this.fieldsList = res.fields;
        },
      })
    );
  }

  public getPermissionDetails(): void {
    this._subscription$.add(
      this._permissionService.getByID(this.permissionId).subscribe({
        next: (res) => {
          this.patchPermissionValues(res);
        },
      })
    );
  }

  public patchPermissionValues(data: PermissionModel): void {
    this.permissionForm.patchValue({
      domain: data?.model?.modelGroupId,
      modelId: data?.model?.id,
      clientId: data?.client?.id,
      fieldsId: data?.allowedFields?.map((field: FieldModel) => field?.id),
      accessLevel: data?.accessLevel,
      ratePerHour: data?.ratePerHour,
      ratePerDay: data?.ratePerDay,
    });
    this.fieldsList = data?.allowedFields;
  }

  public onSubmit(): void {
    delete this.permissionForm.value?.domain;
    const request$ = this.permissionId
      ? this._permissionService.update(
          this.permissionId,
          this.permissionForm.value
        )
      : this._permissionService.create(this.permissionForm.value);
    this._subscription$.add(
      request$.subscribe({
        next: () => {
          const message = this.permissionId ? 'Updated' : 'Created';
          this._toastr.success(
            `${message}!`,
            `Permission has been ${message.toLowerCase()} successfully`
          );
          this._router.navigateByUrl('/data-elements/permissions');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
