import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DomainManagementComponent } from '../domain-management/domain-management.component';
import { DomainService } from '../domain-management/services/domain.service';

describe('DomainManagementComponent', () => {
  let component: DomainManagementComponent;
  let fixture: ComponentFixture<DomainManagementComponent>;
  let mockDomainService: jasmine.SpyObj<DomainService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    mockDomainService = jasmine.createSpyObj('DomainService', ['list']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [DomainManagementComponent],
      providers: [
        { provide: DomainService, useValue: mockDomainService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the domain list on initialization', () => {
    const domains = [{ id: 1, name: 'Domain 1' }, { id: 2, name: 'Domain 2' }];
    mockDomainService.list.and.returnValue(of({ payload: domains }));

    component.ngOnInit();

    expect(mockDomainService.list).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(domains);
  });

  it('should handle pagination correctly', () => {
    component.dataSource.pagination.totalElements = 10;
    component.dataSource.pagination.totalPages = 2;

    component.handlePagination({ currentPage: 2, pageSize: 5 });

    expect(component.filter.offset).toEqual(2);
    expect(component.filter.limit).toEqual(5);
    expect(component.dataSource.pagination.offset).toEqual(2);
    expect(component.dataSource.pagination.limit).toEqual(5);
    expect(mockDomainService.list).toHaveBeenCalled();
  });

  it('should search domains correctly', () => {
    component.onSearch('domain');

    expect(component.filter.keyword).toEqual('domain');
    expect(mockDomainService.list).toHaveBeenCalled();
  });

  it('should open domain form correctly', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockMatDialog.open.and.returnValue(dialogRef);

    component.openDomainForm();

    expect(mockMatDialog.open).toHaveBeenCalled();

    dialogRef.afterClosed.and.returnValue(of({ isClosed: true }));

    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(mockDomainService.list).toHaveBeenCalled();
  });
});
