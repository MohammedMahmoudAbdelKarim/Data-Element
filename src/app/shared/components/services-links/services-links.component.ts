import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MENU_LIST } from 'src/app/core/constants/menu-list.constant';
import { MenuList } from 'src/app/core/models/menu.model';

@Component({
  selector: 'de-services-links',
  templateUrl: './services-links.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class ServicesLinksComponent {
  public menuLinks: MenuList[] = MENU_LIST;
}
