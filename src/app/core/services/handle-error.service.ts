import { ConfigurationService } from './configuration.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(
    private _toaster: ToastrService,
    private _config: ConfigurationService
  ) {}
  public serverErrors$: Observable<any> = this._config.serverErrors$;
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMessage = 'Bad Request';
          this.handleBackendValidations(err);
          break;
        case 401:
          errorMessage = `You need to Login to do this action.`;
          break;
        case 403:
          errorMessage = `You don't have permission to access the requested resource.`;
          break;
        case 404:
          errorMessage = `The requested resources does not exist.`;
          break;
        case 412:
          errorMessage = `Precondition Faild.`;
          break;
        case 500:
          errorMessage = `Internal Server Error.`;
          break;
        case 503:
          errorMessage = `The requested service is not available.`;
          break;
        case 422:
          errorMessage = ``;
          this.handleBackendValidations(err);
          break;
        default:
          errorMessage = `Something want wrong`;
          break;
      }
    }
    if (errorMessage) {
      this._toaster.error(errorMessage);
    }
  }
  public handleBackendValidations(error: HttpErrorResponse) {
    console.log(error.error);

    if (error.error.errors) {
      this._toaster.error(
        error.error.errors[0]['enMessage'],
        'Validation Error'
      );
    } else {
      const errors: any = {};
      for (const key in error.error.errors) {
        if (Object.prototype.hasOwnProperty.call(error.error.errors, key)) {
          errors[key] = error.error.errors[key];
          this._toaster.error(errors[key][0], 'Validation Error');
        }
      }
    }
    this._config.addServerErrors(error);
  }
}
