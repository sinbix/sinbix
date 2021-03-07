import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { ROUTES } from './utils';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
})
export class DepsGraphFeaturesModule {}
