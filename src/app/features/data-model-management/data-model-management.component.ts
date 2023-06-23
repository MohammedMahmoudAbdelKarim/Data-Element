import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  DELETE_ACTION,
  DEFAULT_FILTER_CRITERIA,
  TABLE_ACTIONS,
  VIEW_ACTION,
  EDIT_ACTION,
} from 'src/app/core/constants';
import { FilterCriteriaModel } from 'src/app/core/models';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { DataModelService } from './services/data-model.service';
import { DATA_MODEL_TABLE_HEADERS } from './constants/data-model-table-header';

@Component({
  selector: 'app-data-model-management',
  templateUrl: './data-model-management.component.html',
})
export class DataModelManagementComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public filter: FilterCriteriaModel = DEFAULT_FILTER_CRITERIA;
  public dataSource: DataSourceModel = {
    columns: [...DATA_MODEL_TABLE_HEADERS, TABLE_ACTIONS],
    data: [],
    columnsHeaders: [...DATA_MODEL_TABLE_HEADERS, TABLE_ACTIONS].map(
      (col) => col.colKey
    ),
    pagination: {
      limit: DEFAULT_FILTER_CRITERIA.limit,
      offset: DEFAULT_FILTER_CRITERIA.offset,
      totalElements: 0,
      totalPages: 0,
    },
    allowedActions: [VIEW_ACTION, DELETE_ACTION, EDIT_ACTION],
  };

  constructor(
    public dialog: MatDialog,
    private _dataModelService: DataModelService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this._subscription$.add(
      this._dataModelService.list(this.filter).subscribe((res: any) => {
        this.dataSource.data = res['payload'];
        this.dataSource.pagination.totalElements = res['totalElements'];
        this.dataSource.pagination.totalPages = res['totalPages'];
      })
    );
  }

  public onSearch(value: string): void {
    this.filter.keyword = value;
    this.list();
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

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
