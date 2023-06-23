import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelFormComponent } from './data-model-form.component';

describe('DataModelFormComponent', () => {
  let component: DataModelFormComponent;
  let fixture: ComponentFixture<DataModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
