import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelDetailsComponent } from './data-model-details.component';

describe('DataModelDetailsComponent', () => {
  let component: DataModelDetailsComponent;
  let fixture: ComponentFixture<DataModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
