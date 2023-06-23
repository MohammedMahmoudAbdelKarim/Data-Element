import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default message', () => {
    expect(component.message).toBe('No Data Found');
  });

  it('should display the provided message', () => {
    const testMessage = 'Custom Message';
    component.message = testMessage;
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement.textContent).toContain(testMessage);
  });
});
