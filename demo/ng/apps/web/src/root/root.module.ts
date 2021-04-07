import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { ROUTES, THEMES } from './utils';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
  SxCookieStorage,
  SxCookieModule,
} from '@sinbix-angular/common/storage';
import { SxThemeModule } from '@sinbix-angular/common/theme';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@sinbix/demo/ng/utils/environments';

import { GraphQLModule } from '@sinbix/demo/ng/utils/graphql';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    GraphQLModule,
    HttpClientModule,
    SxCookieModule.forRoot(),
    SxThemeModule.forRoot({
      themes: THEMES,
      themeStorageOpts: {
        storage: SxCookieStorage,
      },
      defaultThemeId: 'light',
    }),
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
