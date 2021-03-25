import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { ROUTES, THEMES } from './utils';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '@sinbix/sinbix/dep-graph/utils';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
  CookieStorage,
  SinbixStorageModule,
  SinbixThemeModule,
} from '@sinbix-angular/utils';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    SinbixStorageModule,
    SinbixThemeModule.forRoot({
      themes: THEMES,
      themeStorageOpts: {
        storage: CookieStorage,
      },
      defaultThemeId: 'light',
    }),
    // GraphQLModule,
    HttpClientModule
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
