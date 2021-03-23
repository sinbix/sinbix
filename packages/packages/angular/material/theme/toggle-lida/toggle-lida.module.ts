import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThemeToggleLidaSlideComponent } from './slide';
import { ThemeToggleLidaSlideTextComponent } from './slide-text';
import { ThemeToggleLidaButtonComponent } from './button';
import { SmatButtonToggleModule } from '@sinbix-angular/material/button-toggle';

@NgModule({
  declarations: [
    ThemeToggleLidaSlideComponent,
    ThemeToggleLidaSlideTextComponent,
    ThemeToggleLidaButtonComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    SmatButtonToggleModule,
  ],
  exports: [
    ThemeToggleLidaSlideComponent,
    ThemeToggleLidaSlideTextComponent,
    ThemeToggleLidaButtonComponent,
  ],
})
export class SmatThemeToggleLidaModule {}
