import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { InputComponent } from '../form-field/input/input.component';

@Component({
  selector: 'de-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    InputComponent,
  ],
})
export class SearchComponent {
  public searchControl: FormControl = new FormControl(null);
  public subscription$: Subscription = new Subscription();
  @Output() searchEmitter = new EventEmitter();
  ngAfterViewInit() {
    this.onSearchChange();
  }
  public onSearchChange(): void {
    this.subscription$.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value: string) => {
          this.searchEmitter.emit(value);
        })
    );
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
