import { Subscription } from 'rxjs';
import { CustomValidations } from './../../../../core/validations/custom-validation';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomainService } from '../../services/domain.service';
import { ToastrService } from 'ngx-toastr';
import { DomainFormModel } from '../../models/domain-template.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomainModel } from '../../models/domain.model';

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
})
export class DomainFormComponent implements OnInit, OnDestroy {
  public domainForm!: DomainFormModel;
  public _subscription$: Subscription = new Subscription();
  public emailsList: string[] = [];

  @Output() editEmitter = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<DomainFormComponent>,
    private _domainService: DomainService,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DomainModel
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.patchForm(this.data);
    }
  }

  public initForm(): void {
    this.domainForm = this._fb.group({
      name: this._fb.control(null, [
        Validators.required,
        CustomValidations.disallowedWhiteSpace,
        CustomValidations.disallowedSpecialCharacters,
      ]),
      admins: this._fb.control([], [Validators.required]),
      path: this._fb.control(null, [
        Validators.required,
        CustomValidations.pathPattern,
      ]),
    });
  }

  public patchForm(form: DomainModel): void {
    this.emailsList.push(...this.data.admins);
    this.domainForm.patchValue(form);
  }

  public getControl(controlName: string): AbstractControl {
    return this.domainForm?.controls[controlName];
  }

  public removeEmail(value: string) {
    const index = this.emailsList.indexOf(value);
    if (index >= 0) {
      this.emailsList.splice(index, 1);
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.emailsList.push(value);
    }
    event.chipInput!.clear();
  }

  public onSubmit(): void {
    const DomainData = this.domainForm.value;
    const request$ = this.data
      ? this._domainService.update(this.data.id, DomainData)
      : this._domainService.create(DomainData);
    this._subscription$.add(
      request$.subscribe(() => {
        const message = this.data ? 'Updated' : 'Created';
        this._toastr.success(
          `${message}!`,
          `Domain has been ${message.toLowerCase()} successfully`
        );
        this.dialogRef.close(true);
        this.dialogRef.afterClosed().subscribe(() => {
          if (this.data) {
            this.editEmitter.emit(true);
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
