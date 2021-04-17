import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmatThemeToggleLidaModule } from '@sinbix-angular/material/theme';
import { SmatNavHButtonsModule } from '@sinbix-angular/material/nav';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';
import { HeaderComponent } from './header';
import { ROUTES } from './web.routes';
import { WebComponent } from './web.component';

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
