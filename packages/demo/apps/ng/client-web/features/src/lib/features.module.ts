import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { HeaderComponent } from './ui';
import { ROUTES } from './features.routes';
import { UiMaterialModule } from '@sinbix/demo/apps/ng/client-web/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
    SmatNavHButtonsModule,
    UiMaterialModule,
  ],
  declarations: [FeaturesComponent, HeaderComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
