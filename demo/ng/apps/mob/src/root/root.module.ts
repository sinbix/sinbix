import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { SxLocalStorage } from '@sinbix-angular/common/storage';
import { SxThemeModule } from '@sinbix-angular/common/theme';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { THEMES } from '@sinbix/demo/ng/utils/themes';
import { ErrorModule } from '@sinbix/demo/ng/utils/error';

import { RootComponent } from './root.component';
import { ROUTES } from './root.routes';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    SxThemeModule.forRoot({
      themes: THEMES,
      themeStorageOpts: {
        storage: SxLocalStorage,
      },
      defaultThemeId: 'light',
    }),
    ErrorModule,
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
