import { DOMAIN_TABLE_HEADERS } from 'src/app/features/domain-management/constants/domain-table-header';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  DEFAULT_FILTER_CRITERIA,
  DELETE_ACTION,
  EDIT_ACTION,
  TABLE_ACTIONS,
  VIEW_ACTION,
} from 'src/app/core/constants';
import { DomainService } from './services/domain.service';
import { FilterCriteriaModel } from 'src/app/core/models';

@Component({
  selector: 'de-domain-management',
  templateUrl: './domain-management.component.html',
})
export class DomainManagementComponent implements OnInit, OnDestroy {
  public filter: FilterCriteriaModel = DEFAULT_FILTER_CRITERIA;
  public dataSource: DataSourceModel = {
    columns: [...DOMAIN_TABLE_HEADERS, TABLE_ACTIONS],
    data: [],
    columnsHeaders: [...DOMAIN_TABLE_HEADERS, TABLE_ACTIONS].map(
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
  private _subscription$: Subscription = new Subscription();
  constructor(
    public dialog: MatDialog,
    private _domainService: DomainService
  ) { }
  ngOnInit(): void {
    this.list();
  }
  public list(): void {
    this._subscription$.add(
      this._domainService.list(this.filter).subscribe((res: any) => {
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
  public openDomainForm(): void {
    const dialogRef = this.dialog.open(DomainFormComponent);
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((isCreated: boolean) => {
        if (isCreated) {
          this.list();
        }
      })
    );
  }
  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
