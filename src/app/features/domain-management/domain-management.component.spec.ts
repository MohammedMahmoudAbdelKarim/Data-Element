import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DomainManagementComponent } from './domain-management.component';
import { DomainService } from './services/domain.service';
import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { MatIconModule } from '@angular/material/icon';

describe('DomainManagementComponent', () => {
  let component: DomainManagementComponent;
  let fixture: ComponentFixture<DomainManagementComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let domainServiceSpy: jasmine.SpyObj<DomainService>;

  beforeEach(async () => {
    // Create spy objects for MatDialog and DomainService
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    domainServiceSpy = jasmine.createSpyObj('DomainService', ['list']);

    await TestBed.configureTestingModule({
      declarations: [DomainManagementComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: DomainService, useValue: domainServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call list method on ngOnInit', () => {
    // Set up fake response data
    const responseData = {
      payload: ['domain1', 'domain2'],
      totalElements: 2,
      totalPages: 1,
    };
    // Configure the domainServiceSpy to return the fake response data
    domainServiceSpy.list.and.returnValue(of(responseData));

    component.ngOnInit();

    expect(domainServiceSpy.list).toHaveBeenCalledWith(component.filter);
    expect(component.dataSource.data).toEqual(responseData.payload);
    expect(component.dataSource.pagination.totalElements).toEqual(
      responseData.totalElements
    );
    expect(component.dataSource.pagination.totalPages).toEqual(
      responseData.totalPages
    );
  });

  it('should call list method on handlePagination', () => {
    const event = {
      currentPage: 2,
      pageSize: 10,
    };

    component.handlePagination(event);

    expect(component.filter.offset).toEqual(event.currentPage);
    expect(component.filter.limit).toEqual(event.pageSize);
    expect(component.dataSource.pagination.offset).toEqual(event.currentPage);
    expect(component.dataSource.pagination.limit).toEqual(event.pageSize);
    expect(domainServiceSpy.list).toHaveBeenCalledWith(component.filter);
  });

  it('should call list method on onSearch', () => {
    const searchValue = 'example';

    component.onSearch(searchValue);

    expect(component.filter.keyword).toEqual(searchValue);
    expect(domainServiceSpy.list).toHaveBeenCalledWith(component.filter);
  });

  it('should call list method on openDomainForm', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const afterClosedSpy = dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.openDomainForm();

    expect(dialogSpy.open).toHaveBeenCalledWith(DomainFormComponent);
    expect(afterClosedSpy).toHaveBeenCalled();
    expect(domainServiceSpy.list).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component._subscription$.closed).toBeTruthy();
  });
});
