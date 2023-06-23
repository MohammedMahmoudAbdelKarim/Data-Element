import { ConfigurationService } from './../services/configuration.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _config: ConfigurationService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._config.enableLoader();
    return next
      .handle(request)
      .pipe(finalize(() => this._config.disableLoader()));
  }
}
