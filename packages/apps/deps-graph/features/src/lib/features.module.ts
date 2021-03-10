import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UiProjectsModule,
  UiMaterialModule,
  UiGraphModule,
} from '@sinbix/apps/deps-graph/ui';
import { DataAccessProjectsModule } from '@sinbix/apps/deps-graph/data-access';
import { FeaturesComponent } from './features.component';
import { SinbixScreenModule } from '@sinbix-angular/utils';
import { ROUTES } from './utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    UiMaterialModule,
    UiProjectsModule,
    UiGraphModule,
    DataAccessProjectsModule,
    SinbixScreenModule,
  ],
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
