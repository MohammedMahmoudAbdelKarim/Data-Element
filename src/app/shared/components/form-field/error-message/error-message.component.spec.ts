import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErrorMessageComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        CommonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation error message when control has errors and is touched or dirty', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    control.markAsDirty();
    component.control = control;
    fixture.detectChanges();

    const errorMessageElement: HTMLElement =
      fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain('This field is required');
  });

  it('should not display validation error message when control has no errors or is not touched or dirty', () => {
    const control = new FormControl('', Validators.required);
    component.control = control;
    fixture.detectChanges();

    const errorMessageElement: HTMLElement =
      fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toBe('');
  });

  it('should display custom label name in error message', () => {
    const control = new FormControl('', Validators.maxLength(5));
    control.markAsTouched();
    control.markAsDirty();
    component.control = control;
    component.labelName = 'Username';
    fixture.detectChanges();

    const errorMessageElement: HTMLElement =
      fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain(
      'Username must be at least 5 characters'
    );
  });
});
