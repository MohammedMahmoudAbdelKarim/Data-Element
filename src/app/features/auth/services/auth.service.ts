import { LoginModel } from './../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public login(loginForm: LoginModel) {
    return this._http.post(`${API_URL('auth')}`, loginForm);
  }
}
