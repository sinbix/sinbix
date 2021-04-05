import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { UiMaterialModule } from '@sinbix/sinbix/ng/ui/material';
import { TooltipComponent } from './tooltip';
import { GraphComponent } from './graph.component';

@NgModule({
  declarations: [GraphComponent, TooltipComponent],
  imports: [CommonModule, UiMaterialModule, OverlayModule],
  exports: [GraphComponent, TooltipComponent],
})
export class UiGraphModule {}
