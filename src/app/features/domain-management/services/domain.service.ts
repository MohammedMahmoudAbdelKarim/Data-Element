import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants';
import { FilterCriteriaModel } from 'src/app/core/models';
import { DomainFormModel } from '../models/domain-template.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private _http: HttpClient) {}

  public list(params?: FilterCriteriaModel) {
    return this._http
      .get(`${API_URL('domains')}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getByID(id: number, params?: any) {
    return this._http
      .get(`${API_URL('domains')}/${id}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']));
  }

  public create(body: DomainFormModel, params?: any) {
    return this._http.post(`${API_URL('domains')}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public delete(id: number, params?: any) {
    return this._http.delete(`${API_URL('domains')}/${id}`, {
      params: { ...params },
      observe: 'response',
    });
  }

  public update(id: number, body: DomainFormModel, params?: any) {
    return this._http.put(`${API_URL('domains')}/${id}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }
}
