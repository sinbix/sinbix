import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { HeaderComponent } from './ui';
import { ROUTES } from './web.routes';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SmatThemeToggleLidaModule,
    SmatNavHButtonsModule,
    UiMaterialModule,
  ],
  declarations: [WebComponent, HeaderComponent],
  exports: [WebComponent],
})
export class WebModule {}
