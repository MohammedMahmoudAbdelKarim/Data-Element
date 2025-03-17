import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants';
import { DataModelFormDataModel } from '../models/data-model.model';
import { map } from 'rxjs';
import { FieldModel } from '../models/fields.model';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  constructor(private _http: HttpClient) {}

  public getByID(id: string, params?: any) {
    return this._http
      .get(`${API_URL('fields')}/${id}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']));
  }

  public create(body: DataModelFormDataModel, params?: any) {
    return this._http.post(`${API_URL('fields')}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public update(id: number | undefined, body: FieldModel, params?: any) {
    return this._http.put(`${API_URL('fields')}/${id}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public getFieldBuiltInFormat() {
    return this._http
      .get(`${API_URL('fields')}/build-in-format`, {
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getFieldTypes() {
    return this._http
      .get(`${API_URL('fields')}/types`, {
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }
}
