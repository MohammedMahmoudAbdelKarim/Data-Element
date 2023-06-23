import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}

  public loaderBS$ = new BehaviorSubject(false);
  public loader$ = this.loaderBS$.asObservable();

  public serverErrorsBS$ = new BehaviorSubject(null);
  public serverErrors$ = this.serverErrorsBS$.asObservable();

  // Loading Configuration
  public enableLoader() {
    this.loaderBS$.next(true);
  }
  public disableLoader() {
    this.loaderBS$.next(false);
  }

  // Server Error Handle Configuration
  public addServerErrors(errors: any) {
    this.serverErrorsBS$.next(errors);
  }
  public removeServerErrors() {
    this.serverErrorsBS$.next(null);
  }
}
