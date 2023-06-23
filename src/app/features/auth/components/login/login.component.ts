import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginFormModel } from '../../models/auth-form.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'de-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: LoginFormModel;
  public subscription$: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  public initForm(): void {
    this.loginForm = this._fb.group({
      email: this._fb.control('mw@data-ele.com', [
        Validators.required,
        Validators.email,
      ]),
      password: this._fb.control(123, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  public getControl(controlName: string): AbstractControl {
    return this.loginForm?.controls[controlName];
  }
  public onSubmit(): void {
    this.subscription$.add(
      this._authService.login(this.loginForm.value).subscribe((res) => {
        console.log(res);
      })
    );
    this._router.navigateByUrl('/data-elements');
    this._toastr.success('Welcome Back, Marwan Darwish');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
