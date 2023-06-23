import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatSpinnerOverlayComponent } from './shared/components/mat-spinner-overlay/mat-spinner-overlay.component';
import { interceptorProviders } from './core/interceptors';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutComponent,
    NotFoundComponent,
    MatSpinnerOverlayComponent,
    CoreModule,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
