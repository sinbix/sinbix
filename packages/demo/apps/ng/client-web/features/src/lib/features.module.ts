import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { HeaderComponent } from './ui';
import { ROUTES } from './features.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
    SmatNavHButtonsModule,
  ],
  declarations: [FeaturesComponent, HeaderComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}