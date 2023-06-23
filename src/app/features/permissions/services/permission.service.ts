import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/api-end-points.constant';
import { FilterCriteriaModel } from 'src/app/core/models/filter-criteria.model';
import { map } from 'rxjs';
import { PermissionModel } from '../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private _http: HttpClient) {}

  public list(params?: FilterCriteriaModel) {
    return this._http
      .get(`${API_URL('permissions')}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getByID(id: number, params?: any) {
    return this._http
      .get(`${API_URL('permissions')}/${id}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public create(body: PermissionModel, params?: any) {
    return this._http.post(`${API_URL('permissions')}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public update(id: number, body: PermissionModel, params?: any) {
    return this._http.put(`${API_URL('permissions')}/${id}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public delete(id: number, params?: any) {
    return this._http.delete(`${API_URL('permissions')}/${id}`, {
      params: { ...params },
      observe: 'response',
    });
  }
}
