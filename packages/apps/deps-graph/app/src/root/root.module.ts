import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { ROUTES } from './utils';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '@sinbix/apps/deps-graph/utils';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {}
