import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UiProjectsModule,
  UiGraphModule,
} from '@sinbix/sinbix/ng/ui/dep-graph';
import { UiMaterialModule } from '@sinbix/sinbix/ng/ui/material';

import { DepGraphComponent } from './dep-graph.component';
import { ROUTES } from './utils';
import { SidebarComponent } from './sidebar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    UiMaterialModule,
    UiProjectsModule,
    UiGraphModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DepGraphComponent, SidebarComponent],
  exports: [DepGraphComponent],
})
export class DepGraphModule {}
