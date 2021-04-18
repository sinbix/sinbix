import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { SxCookieServerModule } from '@sinbix-angular/common/storage';
import { RootComponent } from './root.component';
import { RootModule } from './root.module';
import { ServerStateInterceptor } from './utils';

@NgModule({
  imports: [
    RootModule,
    ServerModule,
    ServerTransferStateModule,
    SxCookieServerModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [RootComponent],
})
export class RootServerModule {}
