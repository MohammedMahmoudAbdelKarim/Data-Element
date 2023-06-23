import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'de-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ErrorMessageComponent,
    ErrorMessageComponent,
  ],
})
export class SelectComponent implements OnInit {
  public searchCtrl: FormControl = new FormControl(null);
  public subscription$: Subscription = new Subscription();
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() optionValue!: string;
  @Input() optionLabel!: string;
  @Input() searchable!: boolean;
  @Input() displayClearBtn!: boolean;
  @Input() multiple!: boolean;
  @Input() data!: any[];
  @Input() searchOptions!: any;
  @Input() controller: AbstractControl = new FormControl();
  @Output() selectEmitter = new EventEmitter();
  @Output() clearSelectEmitter = new EventEmitter();
  @Output() autoCompleteEmitter = new EventEmitter();

  ngOnInit(): void {
    this.onAutoComplete();
  }

  public onAutoComplete(): void {
    this.subscription$.add(
      this.searchCtrl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (value: string) => this.autoCompleteEmitter.emit(value),
        })
    );
  }

  public onSelectionChange(event: any) {
    this.selectEmitter.emit(event);
  }
  public clearSelectionSearch(): void {
    if (this.searchCtrl?.value?.length) {
      this.clearSelectEmitter.emit(null);
      this.searchCtrl.reset();
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
