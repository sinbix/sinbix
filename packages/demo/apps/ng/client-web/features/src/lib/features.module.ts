import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { ROUTES } from './utils';
import { HeaderComponent } from './ui/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
  ],
  declarations: [FeaturesComponent, HeaderComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
