import { ConfigurationService } from './services/configuration.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastrModule.forRoot(), HttpClientModule],
  providers: [ConfigurationService, ToastrService],
})
export class CoreModule {}
