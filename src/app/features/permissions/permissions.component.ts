import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSourceModel, FilterCriteriaModel } from 'src/app/core/models';
import { PERMISSION_TABLE_HEADERS } from './constants/permission-table-header';
import {
  DEFAULT_FILTER_CRITERIA,
  DELETE_ACTION,
  EDIT_ACTION,
  TABLE_ACTIONS,
  VIEW_ACTION,
} from 'src/app/core/constants';
import { PermissionService } from './services/permission.service';
import { PermissionModel } from './models/permission.model';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
})
export class PermissionsComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public dataSource: DataSourceModel = {
    columns: [...PERMISSION_TABLE_HEADERS, TABLE_ACTIONS],
    data: [],
    columnsHeaders: [...PERMISSION_TABLE_HEADERS, TABLE_ACTIONS].map(
      (col) => col.colKey
    ),
    pagination: {
      limit: DEFAULT_FILTER_CRITERIA.limit,
      offset: DEFAULT_FILTER_CRITERIA.offset,
      totalElements: 0,
      totalPages: 0,
    },
    allowedActions: [VIEW_ACTION, EDIT_ACTION, DELETE_ACTION],
  };
  public filter: FilterCriteriaModel = DEFAULT_FILTER_CRITERIA;

  constructor(private _permissionService: PermissionService) {}

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this._subscription$.add(
      this._permissionService.list(this.filter).subscribe((res: any) => {
        this.dataSource.data = this.mapPermissionData(res['payload']);
        this.dataSource.pagination.totalElements = res['totalElements'];
        this.dataSource.pagination.totalPages = res['totalPages'];
      })
    );
  }

  public mapPermissionData(data: PermissionModel[]): PermissionModel[] {
    return data.map((item) => {
      item.modelName = item.model?.name;
      item.clientName = item?.client?.name;
      return item;
    });
  }

  public handlePagination(event: {
    currentPage: number;
    pageSize: number;
  }): void {
    let { currentPage, pageSize } = event;
    this.filter.offset = this.dataSource.pagination.offset = currentPage;
    this.filter.limit = this.dataSource.pagination.limit = pageSize;
    this.list();
  }

  public onSearch(value: string): void {
    this.filter.keyword = value;
    this.list();
  }

  public handleDeleteAction(event: boolean) {
    if (event) {
      this.list();
    }
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
