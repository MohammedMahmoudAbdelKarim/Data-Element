import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, delay } from 'rxjs';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'de-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class MatSpinnerOverlayComponent {
  constructor(private _config: ConfigurationService) {}
  public loader$: Observable<boolean> = this._config.loader$.pipe(delay(0));
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = 'indeterminate';
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = 'primary';
}
