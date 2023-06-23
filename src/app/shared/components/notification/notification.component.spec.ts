import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent, CommonModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NotificationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with notifications array containing one element', () => {
    expect(component.notifications).toEqual(['1']);
  });

  it('should remove a notification when removeNotification() is called', () => {
    component.removeNotification(0);
    expect(component.notifications).toEqual([]);
  });
});
