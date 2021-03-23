import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { GraphComponent } from './graph.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { UiMaterialModule } from '../material';

@NgModule({
  declarations: [GraphComponent, TooltipComponent],
  imports: [CommonModule, OverlayModule, UiMaterialModule],
  exports: [GraphComponent, TooltipComponent],
})
export class UiGraphModule {}
