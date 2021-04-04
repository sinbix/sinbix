import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe } from './pipes';

@NgModule({
  declarations: [LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe],
  imports: [CommonModule],
  exports: [LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe],
})
export class SxResponsiveModule {}
