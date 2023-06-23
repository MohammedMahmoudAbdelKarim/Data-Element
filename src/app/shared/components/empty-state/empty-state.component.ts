import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-empty-state',
  templateUrl: './empty-state.component.html',
  standalone: true,
  imports: [MatIconModule],
})
export class EmptyStateComponent {
  @Input() message: string = 'No Data Found';
}
