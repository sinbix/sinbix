import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UiProjectsModule,
  UiMaterialModule,
  UiGraphModule,
} from '@sinbix/apps/deps-graph/ui';
import { FeaturesComponent } from './features.component';
import { SinbixScreenModule } from '@sinbix-angular/utils';
import { ROUTES } from './utils';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    UiMaterialModule,
    UiProjectsModule,
    UiGraphModule,
    SinbixScreenModule,
  ],
  declarations: [FeaturesComponent, SidebarComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
