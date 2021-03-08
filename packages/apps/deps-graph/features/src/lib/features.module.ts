import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DepsGraphUiProjectsModule,
  DepsGraphUiMaterialModule,
} from '@sinbix/apps/deps-graph/ui';
import { FeaturesComponent } from './features.component';
import { ROUTES } from './utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    DepsGraphUiProjectsModule,
    DepsGraphUiMaterialModule,
  ],
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
})
export class DepsGraphFeaturesModule {}
