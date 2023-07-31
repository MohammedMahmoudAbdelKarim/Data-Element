import { CoreModule } from './../core/core.module';
import { FooterComponent } from './../shared/components/footer/footer.component';
import { NotificationComponent } from './../shared/components/notification/notification.component';
import { ServicesLinksComponent } from './../shared/components/services-links/services-links.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MENU_LIST } from '../core/constants/menu-list.constant';
import { MenuList } from '../core/models/menu.model';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'el-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRippleModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    ServicesLinksComponent,
    NotificationComponent,
    MatTooltipModule,
    FooterComponent,
  ],
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  public menuLinks: MenuList[] = MENU_LIST;

  constructor(
    private _observer: BreakpointObserver,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this._cdr.detectChanges();
  }

  public logout() {
    this._router.navigateByUrl('/auth/login');
  }
}
