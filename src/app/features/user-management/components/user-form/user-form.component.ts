import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidations } from 'src/app/core/validations/custom-validation';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public domainForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.domainForm = this._fb.group({
      name: this._fb.control(null, [
        Validators.required,
        CustomValidations.disallowedWhiteSpace,
        CustomValidations.disallowedSpecialCharacters,
      ]),
      admins: this._fb.control([], [Validators.required]),
    });
  }
  public getControl(controlName: string): AbstractControl {
    return this.domainForm?.controls[controlName];
  }

  public onSearch(value: string): void {
    console.log(value);
  }
  public onSubmit(): void {
    console.log('SUBMIT');
  }
}
