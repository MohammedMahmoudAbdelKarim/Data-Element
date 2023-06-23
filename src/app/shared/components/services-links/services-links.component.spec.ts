import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesLinksComponent } from './services-links.component';
import { MENU_LIST } from 'src/app/core/constants/menu-list.constant';

describe('ServicesLinksComponent', () => {
  let component: ServicesLinksComponent;
  let fixture: ComponentFixture<ServicesLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ServicesLinksComponent,
        CommonModule,
        RouterModule,
        MatIconModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuLinks with MENU_LIST', () => {
    expect(component.menuLinks).toEqual(MENU_LIST);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
