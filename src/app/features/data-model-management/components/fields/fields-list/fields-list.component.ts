import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
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

  constructor(public dialog: MatDialog) {}

  ngOnChanges(): void {
    if (this.data) {
      this.dataSource.data = this.data;
      this.dataSource.pagination.totalElements = this.data.length;
    }
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
