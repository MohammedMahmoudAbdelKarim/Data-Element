import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  inject,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay.component';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { of } from 'rxjs';

describe('MatSpinnerOverlayComponent', () => {
  let component: MatSpinnerOverlayComponent;
  let fixture: ComponentFixture<MatSpinnerOverlayComponent>;
  let configService: ConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSpinnerOverlayComponent,
        MatProgressSpinnerModule,
        CommonModule,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useValue: { loader$: of(true) }, // Mock the ConfigurationService with a loader observable returning true
        },
      ],
    }).compileComponents();
  });

  beforeEach(inject([ConfigurationService], (service: ConfigurationService) => {
    fixture = TestBed.createComponent(MatSpinnerOverlayComponent);
    component = fixture.componentInstance;
    configService = service;
    fixture.detectChanges();
  }));

  it('should create the MatSpinnerOverlayComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.value).toEqual(100);
    expect(component.diameter).toEqual(100);
    expect(component.mode).toEqual('indeterminate');
    expect(component.strokeWidth).toEqual(10);
    expect(component.overlay).toBeFalsy();
    expect(component.color).toEqual('primary');
  });

  it('should display the spinner when loader$ emits true', fakeAsync(() => {
    configService.loader$ = of(true); // Update the loader$ observable to emit true
    fixture.detectChanges();
    tick();

    const spinnerElement: HTMLElement = fixture.nativeElement;
    const spinner = spinnerElement.querySelector('.mat-spinner');

    expect(spinner).toBeTruthy();
  }));

  it('should not display the spinner when loader$ emits false', fakeAsync(() => {
    configService.loader$ = of(false); // Update the loader$ observable to emit false
    fixture.detectChanges();
    tick();

    const spinnerElement: HTMLElement = fixture.nativeElement;
    const spinner = spinnerElement.querySelector('.mat-spinner');

    expect(spinner).toBeFalsy();
  }));
});
