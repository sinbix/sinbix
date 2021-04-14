import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';
import { ErrorComponent } from './error.component';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorService } from './error.service';

@NgModule({
  imports: [UiMaterialModule],
  providers: [
    ErrorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  declarations: [ErrorComponent],
})
export class ErrorModule {}
