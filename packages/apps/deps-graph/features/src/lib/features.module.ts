import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeaturesComponent } from './features.component';
import { ROUTES } from './utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DepsGraphUiProjectsModule } from '@sinbix/apps/deps-graph/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DepsGraphUiProjectsModule,
  ],
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
})
export class DepsGraphFeaturesModule {}
