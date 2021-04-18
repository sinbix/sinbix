import { NgModule } from '@angular/core';
import { CookieBackendModule } from 'ngx-cookie-backend';

@NgModule()
export class SxCookieServerModule {
  static forRoot() {
    return [CookieBackendModule.forRoot()];
  }
}
