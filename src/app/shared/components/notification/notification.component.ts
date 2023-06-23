import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'de-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class NotificationComponent implements OnInit {
  public notifications: string[] = ['1'];
  constructor() {}

  ngOnInit(): void {}

  public removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}
