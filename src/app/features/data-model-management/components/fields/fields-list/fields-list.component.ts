import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldModel } from '../../../models/fields.model';
import { DataSourceModel, FilterCriteriaModel } from 'src/app/core/models';
import {
  DEFAULT_FILTER_CRITERIA,
  EDIT_ACTION,
  TABLE_ACTIONS,
} from 'src/app/core/constants';
import { FIELD_TABLE_HEADERS } from '../../../constants/field-table-header';
import { FieldFormComponent } from '../field-form/field-form.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'de-fields-list',
  templateUrl: './fields-list.component.html',
})
export class FieldsListComponent implements OnDestroy {
  private readonly _subscription$: Subscription = new Subscription();
  public filterCriteria: FilterCriteriaModel = DEFAULT_FILTER_CRITERIA;
  public dataSource: DataSourceModel = {
    columns: [...FIELD_TABLE_HEADERS],
    data: [],
    columnsHeaders: [...FIELD_TABLE_HEADERS, TABLE_ACTIONS].map(
      (col) => col.colKey
    ),
    pagination: {
      limit: DEFAULT_FILTER_CRITERIA.limit,
      offset: DEFAULT_FILTER_CRITERIA.offset,
      totalElements: 0,
    },
    allowedActions: [EDIT_ACTION],
  };
  @Input() modelId!: string;
  @Input() data!: FieldModel[];
  @Output() editEmitter = new EventEmitter();
  @Output() paginationEmitter = new EventEmitter();
  limit: number = 10;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(): void {
    if (this.data) {
      this.dataSource.data = this.data.slice(0, 10);
      this.dataSource.pagination.limit = this.limit;
      this.dataSource.pagination.totalElements = this.data.length;
      this.dataSource.pagination.offset = 0;
      this.paginationEmitter.emit(this.dataSource.pagination);
    }
  }

  public handlePageEvent(event: PageEvent | any): void {
    this.dataSource.pagination.offset = event.pageIndex;
    this.dataSource.pagination.limit = event.pageSize;
    const startIndex = +event.currentPage * +event.pageSize;
    const endIndex = +startIndex + +event.pageSize;
    this.dataSource.data = this.data.slice(startIndex, endIndex);
    this.paginationEmitter.emit(event);
  }

  public handleEditField(event: { element: FieldModel; action: string }): void {
    const dialogRef = this.dialog.open(FieldFormComponent, {
      data: event.element,
    });
    this._subscription$.add(
      dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.editEmitter.emit(true);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }
}
