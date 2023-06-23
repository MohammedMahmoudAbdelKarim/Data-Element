import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/api-end-points.constant';
import { FilterCriteriaModel } from 'src/app/core/models/filter-criteria.model';
import { ClientFormDataModel } from '../models/client-template.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private _http: HttpClient) {}

  public list(params?: FilterCriteriaModel) {
    return this._http
      .get(`${API_URL('clients')}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getByID(id: number, params?: any) {
    return this._http
      .get(`${API_URL('clients')}/${id}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public create(body: ClientFormDataModel, params?: any) {
    return this._http.post(`${API_URL('clients')}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public update(id: number, body: ClientFormDataModel, params?: any) {
    return this._http.put(`${API_URL('clients')}/${id}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public delete(id: number, params?: any) {
    return this._http.delete(`${API_URL('clients')}/${id}`, {
      params: { ...params },
      observe: 'response',
    });
  }
}
