import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants';
import { FilterCriteriaModel } from 'src/app/core/models';
import { DataModelFormDataModel } from '../models/data-model.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataModelService {
  constructor(private _http: HttpClient) {}

  public list(params?: FilterCriteriaModel) {
    return this._http
      .get(`${API_URL('model')}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getByID(id: number, params?: any) {
    return this._http
      .get(`${API_URL('model')}/${id}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public create(body: DataModelFormDataModel, params?: any) {
    return this._http.post(`${API_URL('model')}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public update(id: number, body: DataModelFormDataModel, params?: any) {
    return this._http.put(`${API_URL('model')}/${id}`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public delete(id: number, params?: any) {
    return this._http.delete(`${API_URL('model')}/${id}`, {
      params: { ...params },
      observe: 'response',
    });
  }

  public uploadSample(file: FormData, params?: any) {
    return this._http
      .post(`${API_URL('model')}/upload-sample`, file, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public getTransformers(params?: any) {
    return this._http
      .get(`${API_URL('model')}/transformers`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public uploadModelFile(modelId: number, body: FormData, params?: any) {
    return this._http.post(`${API_URL('model')}/${modelId}/upload`, body, {
      params: { ...params },
      observe: 'response',
    });
  }

  public listHistoryLog(params?: FilterCriteriaModel) {
    return this._http
      .get(`${API_URL('jobs')}`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']['payload']));
  }

  public downloadModelFile(fileId: number, params?: any) {
    return this._http
      .get(`${API_URL('jobs')}/${fileId}/files`, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(map((res: any) => res['body']));
  }
}
