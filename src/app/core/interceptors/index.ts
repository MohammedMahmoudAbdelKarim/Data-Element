import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './api.interceptor';
import { LoadingInterceptor } from './loader.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
