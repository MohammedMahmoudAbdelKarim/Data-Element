import { Observable } from 'rxjs/internal/Observable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { ERROR_MESSAGE } from 'src/app/core/constants';

@Component({
  selector: 'de-error-message',
  templateUrl: './error-message.component.html',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
})
export class ErrorMessageComponent {
  @Input() public control!: AbstractControl;
  @Input() public labelName?: string;
  ngOnInit(): void {}

  get errorMessage(): any {
    if (this.control?.errors && (this.control.touched || this.control.dirty)) {
      for (const propertyName in this.control.errors) {
        return this.getValidationErrorMessage(propertyName, this.labelName);
      }
    }
    return of('');
  }

  public getValidationErrorMessage(
    validatorName: string,
    labelName?: string
  ): Observable<string> {
    return of(`${labelName}${ERROR_MESSAGE[validatorName]}`);
  }
}
