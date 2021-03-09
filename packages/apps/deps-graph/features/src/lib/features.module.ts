import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiProjectsModule, UiMaterialModule } from '@sinbix/apps/deps-graph/ui';
import { DataAccessProjectsModule } from '@sinbix/apps/deps-graph/data-access';
import { FeaturesComponent } from './features.component';
import { ROUTES } from './utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    UiProjectsModule,
    UiMaterialModule,
    DataAccessProjectsModule,
  ],
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
