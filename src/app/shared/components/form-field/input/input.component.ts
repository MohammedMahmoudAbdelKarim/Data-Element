import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageComponent } from './../error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'de-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ErrorMessageComponent,
    MatButtonModule,
  ],
})
export class InputComponent {
  public hide: boolean = true;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() controller: AbstractControl = new FormControl();
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() isReadOnly?: boolean;
  @Input() pattern!: string | RegExp;
  @Input() required!: boolean;
  @Input() isPassword!: boolean;
  @Input() min!: number;
  @Input() minLength?: number;
  @Input() maxLength!: number;
  @Output() inputEmitter = new EventEmitter();
  public onInputChange(event: any): void {
    this.inputEmitter.emit(event?.target?.value);
  }
  public togglePassword() {
    this.hide = !this.hide;
    this.hide ? (this.type = 'password') : (this.type = 'text');
  }
}
