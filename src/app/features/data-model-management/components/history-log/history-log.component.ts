import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, map } from 'rxjs';
import {
  DEFAULT_FILTER_CRITERIA,
  DOWNLOAD_ACTION,
  TABLE_ACTIONS,
} from 'src/app/core/constants';
import { DataSourceModel, FilterCriteriaModel } from 'src/app/core/models';
import { DataModelService } from '../../services/data-model.service';
import { HISTORY_TABLE_HEADERS } from '../../constants/data-model-table-header';
import { HistoryLog } from '../../models/data-model.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'de-history-log',
  templateUrl: './history-log.component.html',
})
export class HistoryLogComponent implements OnInit {
  public filter: FilterCriteriaModel = DEFAULT_FILTER_CRITERIA;
  private readonly _subscription$: Subscription = new Subscription();
  public dataSource: DataSourceModel = {
    columns: [...HISTORY_TABLE_HEADERS, TABLE_ACTIONS],
    data: [],
    columnsHeaders: [...HISTORY_TABLE_HEADERS, TABLE_ACTIONS].map(
      (col) => col.colKey
    ),
    pagination: {
      limit: DEFAULT_FILTER_CRITERIA.limit,
      offset: DEFAULT_FILTER_CRITERIA.offset,
      totalElements: 0,
      totalPages: 0,
    },
    allowedActions: [DOWNLOAD_ACTION],
  };
  @Output() downloadEmitter = new EventEmitter();
  @Output() paginateEmitter = new EventEmitter();

  constructor(
    private _dataModelService: DataModelService,
    private _datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this._subscription$.add(
      this._dataModelService.listHistoryLog(this.filter).subscribe({
        next: (res: any) => {
          this.dataSource.data = this.formateHistoryDate(res['payload']);
          this.dataSource.pagination.totalElements = res['totalElements'];
          this.dataSource.pagination.totalPages = res['totalPages'];
        },
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
    this.paginateEmitter.emit(event);
  }

  public formateHistoryDate(data: HistoryLog[]) {
    return data?.map(({ uploadedDateTime, ...history }) => ({
      uploadedDateTime: this._datePipe.transform(uploadedDateTime, 'medium'),
      ...history,
    }));
  }

  public handleAction(event: { action: string; element: any }) {
    if (event.action === 'DOWNLOAD') {
      this._subscription$.add(
        this._dataModelService.downloadModelFile(event?.element.id).subscribe({
          next: (res) => {
            const blob = new Blob([JSON.stringify(res)], {
              type: 'application/octet-stream',
            });
            const fileName = 'data-model.json';
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            link.remove();
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
