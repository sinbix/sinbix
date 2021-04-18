import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

@NgModule()
export class SxCookieModule {
  static forRoot() {
    return [CookieModule.forRoot()];
  }
}
