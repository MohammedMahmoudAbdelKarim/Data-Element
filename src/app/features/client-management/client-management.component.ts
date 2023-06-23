import { Component, OnInit, OnDestroy } from '@angular/core';
import { CLIENT_TABLE_HEADERS } from './constants/client-table-header';
import {
  DELETE_ACTION,
  EDIT_ACTION,
  DEFAULT_FILTER_CRITERIA,
  TABLE_ACTIONS,
  VIEW_ACTION,
} from 'src/app/core/constants';
import { Subscription } from 'rxjs';
import { ClientService } from './services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DataSourceModel, FilterCriteriaModel } from 'src/app/core/models';

@Component({
  selector: 'de-client-management',
  templateUrl: './client-management.component.html',
})
export class ClientManagementComponent implements OnInit, OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public dataSource: DataSourceModel = {
    columns: [...CLIENT_TABLE_HEADERS, TABLE_ACTIONS],
    data: [],
    columnsHeaders: [...CLIENT_TABLE_HEADERS, TABLE_ACTIONS].map(
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

  constructor(
    private _clientService: ClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this._subscription$.add(
      this._clientService.list(this.filter).subscribe((res: any) => {
        this.dataSource.data = res['payload'];
        this.dataSource.pagination.totalElements = res['totalElements'];
        this.dataSource.pagination.totalPages = res['totalPages'];
      })
    );
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

  public refreshPage(event: boolean): void {
    if (event) {
      this.list();
    }
  }

  public handleDeleteAction(event: boolean) {
    this.refreshPage(event);
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
