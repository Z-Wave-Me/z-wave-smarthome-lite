import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@core/services/api/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../../interceptors/api/api.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class ApiModule {}
