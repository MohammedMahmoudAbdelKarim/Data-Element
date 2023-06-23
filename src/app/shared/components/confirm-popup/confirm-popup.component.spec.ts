import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
describe('ConfirmPopupComponent', () => {
  let component: ConfirmPopupComponent;
  let fixture: ComponentFixture<ConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        MatIconModule,
        ConfirmPopupComponent,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the message from the input', () => {
    const testMessage = 'test message';
    component.ngOnInit();
    expect(component.message).toEqual(testMessage);
  });

  it('should set a default message if the input is not provided', () => {
    component.data = undefined;
    component.ngOnInit();
    expect(component.message).toEqual('Are you sure you want to delete this?');
  });
});
