import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';
import { MobComponent } from './mob.component';
import { HeaderComponent } from './header';
import { ROUTES } from './mob.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GamesInterceptor } from './utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
    SmatNavHButtonsModule,
    UiMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GamesInterceptor, multi: true },
  ],
  declarations: [MobComponent, HeaderComponent],
  exports: [MobComponent],
})
export class MobModule {}
