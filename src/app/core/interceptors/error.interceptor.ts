import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from '../services/handle-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _handleError: HandleErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._handleError.handleError(error);
        this._handleError.handleBackendValidations(error);
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}
