import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'de-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
})
export class PaginationComponent {
  public pageSize: number = 0;
  public pageSizeOptions: number[] = [10, 25, 50];
  public pageEvent?: PageEvent;

  @Input() length?: number;
  @Input() pageIndex: number = 0;
  @Output() paginationEmitter = new EventEmitter();

  public handlePageEvent(event: PageEvent): void {
    let { pageIndex, pageSize, length } = event;
    this.paginationEmitter.emit({
      currentPage: pageIndex,
      pageSize,
      length,
    });
    this.length = length;
    this.pageEvent = event;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
