import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldModel } from '../../../models/fields.model';
import { Subscription } from 'rxjs';
import { FieldsService } from '../../../services/fields.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'de-field-form',
  templateUrl: './field-form.component.html',
})
export class FieldFormComponent implements OnInit {
  private readonly _subscription$: Subscription = new Subscription();
  public fieldTypes!: string[];
  public builtInFormat!: string[];
  public modelFieldsForm!: FormGroup;
  public modelId!: number;
  @Output() editEmitter = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FieldModel,
    private _fieldService: FieldsService,
    private _toastr: ToastrService,
    public dialogRef: MatDialogRef<FieldFormComponent>,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getFieldsTypes();
    this.getBuiltInFormat();
    this.modelId = +this._route.snapshot.queryParams['id'];
    if (this.data) {
      this.disableNameAndTypeField();
      this.patchFieldData();
    }
  }

  public initForm(): void {
    this.modelFieldsForm = this._fb.group({
      name: this._fb.control(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      type: this._fb.control(null, [Validators.required]),
      required: this._fb.control(false),
      numberRange: this._fb.control(null),
      stringLength: this._fb.control(null),
      builtInFormat: this._fb.control(null),
      numberMax: this._fb.control(null),
      numberMin: this._fb.control(null),
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.modelFieldsForm?.controls[controlName];
  }

  public getFieldsTypes(): void {
    this._subscription$.add(
      this._fieldService.getFieldTypes().subscribe({
        next: (res) => {
          this.fieldTypes = res;
        },
      })
    );
  }

  public getBuiltInFormat(): void {
    this._subscription$.add(
      this._fieldService.getFieldBuiltInFormat().subscribe({
        next: (res) => {
          this.builtInFormat = res;
        },
      })
    );
  }

  public disableNameAndTypeField(): void {
    this.modelFieldsForm.get('name')?.disable();
    this.modelFieldsForm.get('type')?.disable();
  }

  public patchFieldData(): void {
    this.modelFieldsForm.patchValue({ ...this.data });
  }

  public onSubmit(): void {
    const DomainData = { ...this.modelFieldsForm.value, modelId: this.modelId };
    const request$ = this.data
      ? this._fieldService.update(this.data?.id, DomainData)
      : this._fieldService.create(DomainData);
    this._subscription$.add(
      request$.subscribe(() => {
        const message = this.data ? 'Updated' : 'Created';
        this._toastr.success(
          `${message}!`,
          `Field has been ${message.toLowerCase()} successfully`
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
