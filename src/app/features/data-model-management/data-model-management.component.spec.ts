import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelManagementComponent } from './data-model-management.component';

describe('DataModelManagementComponent', () => {
  let component: DataModelManagementComponent;
  let fixture: ComponentFixture<DataModelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
