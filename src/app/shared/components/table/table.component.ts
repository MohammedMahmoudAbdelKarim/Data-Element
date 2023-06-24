import { PaginationComponent } from './../pagination/pagination.component';
import { MatButtonModule } from '@angular/material/button';
import { MapValuePipe } from './../../pipes/map-value.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './../empty-state/empty-state.component';
import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { DataSourceModel } from 'src/app/core/models/data-source.model';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'de-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatRippleModule,
    EmptyStateComponent,
    CommonModule,
    MatTooltipModule,
    MapValuePipe,
    MatButtonModule,
    MatMenuModule,
    PaginationComponent,
  ],
})
export class TableComponent {
  @Input() dataSource!: DataSourceModel;
  @Output() actionEmitter = new EventEmitter();
  @Output() paginationEmitter = new EventEmitter();
  public onHandleAction(element: any, action: string, event: Event) {
    this.actionEmitter.emit({ element, action });
    event.stopPropagation();
  }
}
