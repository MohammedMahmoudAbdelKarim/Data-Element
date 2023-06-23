import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'el-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule],
})
export class ConfirmPopupComponent implements OnInit {
  @Input() message!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.message = this.data || 'Are you sure you want to delete this?';
  }
}
