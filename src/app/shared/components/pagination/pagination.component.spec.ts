import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, CommonModule, MatPaginatorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PaginationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.pageSize).toBe(0);
    expect(component.pageSizeOptions).toEqual([10, 25, 50]);
    expect(component.pageEvent).toBeUndefined();
  });

  it('should emit pagination event on handlePageEvent()', () => {
    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 25,
      length: 100,
    };

    spyOn(component.paginationEmitter, 'emit');
    component.handlePageEvent(pageEvent);

    expect(component.paginationEmitter.emit).toHaveBeenCalledWith({
      currentPage: 2,
      pageSize: 25,
      length: 100,
    });
    expect(component.length).toBe(100);
    expect(component.pageEvent).toBe(pageEvent);
    expect(component.pageSize).toBe(25);
    expect(component.pageIndex).toBe(2);
  });
});
