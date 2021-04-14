import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';
import { MobComponent } from './mob.component';
import { HeaderComponent } from './header';
import { ROUTES } from './mob.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
    SmatNavHButtonsModule,
    UiMaterialModule,
  ],
  declarations: [MobComponent, HeaderComponent],
  exports: [MobComponent],
})
export class MobModule {}
