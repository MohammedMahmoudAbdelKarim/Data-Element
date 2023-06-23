import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EmptyStateComponent } from './../empty-state/empty-state.component';
import { MapValuePipe } from './../../pipes/map-value.pipe';
import { PaginationComponent } from './../pagination/pagination.component';
import { TableComponent } from './table.component';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { DATA_MODEL_TABLE_HEADERS } from 'src/app/features/data-model-management/constants/field-table-header';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TableComponent,
        EmptyStateComponent,
        MapValuePipe,
        PaginationComponent,
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatRippleModule,
        MatTooltipModule,
        MatButtonModule,
        MatMenuModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have input properties', () => {
    const dataSource: DataSourceModel = {
      columns: [...DATA_MODEL_TABLE_HEADERS, { title: '', colKey: 'actions' }],
      data: [
        {
          id: '#MIIDW5656L',
          name: 'Domain_Name',
          dataModel: 5,
          lastModifiedAt: '28 March 2023',
        },
      ],
      columnsHeaders: [
        ...DATA_MODEL_TABLE_HEADERS,
        { title: '', colKey: 'actions' },
      ].map((col) => col.colKey),
      allowedActions: [
        {
          label: 'Delete',
          icon: 'delete',
          action: 'DELETE',
        },
        {
          label: 'Edit',
          icon: 'edit',
          action: 'EDIT',
        },
      ],
      pagination: {
        limit: 10,
        offset: 0,
        totalElements: 16,
        totalPages: 2,
      },
    };
    component.dataSource = dataSource;

    expect(component.dataSource).toEqual(dataSource);
  });

  it('should emit action event on handleAction()', () => {
    const element = {}; // Provide a sample element
    const action = 'sampleAction';
    const event = new Event('click');

    spyOn(component.actionEmitter, 'emit');
    component.onHandleAction(element, action, event);

    expect(component.actionEmitter.emit).toHaveBeenCalledWith({
      element,
      action,
    });
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
