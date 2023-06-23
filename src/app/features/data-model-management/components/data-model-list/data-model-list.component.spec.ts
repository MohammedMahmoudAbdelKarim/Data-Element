import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataModelListComponent } from './data-model-list.component';
import { DataModelService } from '../../services/data-model.service';
import { ConfirmPopupComponent } from './../../../../shared/components/confirm-popup/confirm-popup.component';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('DataModelListComponent', () => {
  let component: DataModelListComponent;
  let fixture: ComponentFixture<DataModelListComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dataModelServiceSpy: jasmine.SpyObj<DataModelService>;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dataModelServiceSpy = jasmine.createSpyObj('DataModelService', ['delete']);

    TestBed.configureTestingModule({
      declarations: [DataModelListComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DataModelService, useValue: dataModelServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to data model details on VIEW action', () => {
    const element = { id: '123' };
    component.handleAction({ action: 'VIEW', element });
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      ['/data-elements/data-model-management/data-model-details'],
      {
        queryParams: { id: element.id },
      }
    );
  });

  it('should open delete confirmation popup on DELETE action', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of({ isClosed: true }));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    const element = { id: '123' };
    component.handleAction({ action: 'DELETE', element });
    expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmPopupComponent);
    expect(dataModelServiceSpy.delete).not.toHaveBeenCalled();

    dialogRefSpy.afterClosed.and.returnValue(of(null));
    component.handleAction({ action: 'DELETE', element });
    expect(dataModelServiceSpy.delete).not.toHaveBeenCalled();

    dialogRefSpy.afterClosed.and.returnValue(of({ isClosed: false }));
    component.handleAction({ action: 'DELETE', element });
    expect(dataModelServiceSpy.delete).not.toHaveBeenCalled();

    dialogRefSpy.afterClosed.and.returnValue(of({ isClosed: true }));
    component.handleAction({ action: 'DELETE', element });
    expect(dataModelServiceSpy.delete).toHaveBeenCalledWith(element.id);
  });

  it('should call deleteEmitter on deleteClient', () => {
    const id = '123';
    const deleteEmitterSpy = spyOn(component.deleteEmitter, 'emit');

    // Update the type of the mock Observable to HttpResponse<Object>
    dataModelServiceSpy.delete.and.returnValue(
      of(new HttpResponse<Object>({ status: 200 }))
    );

    component.deleteClient(id);
    expect(dataModelServiceSpy.delete).toHaveBeenCalledWith(id);
    expect(deleteEmitterSpy).toHaveBeenCalled();
  });
});
