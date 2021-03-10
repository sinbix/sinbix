import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe } from './pipes';
import { ResponsiveService } from './responsive.service';

@NgModule({
  declarations: [LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe],
  imports: [CommonModule],
  exports: [LtBreakpointPipe, GtBreakpointPipe, BwBreakpointPipe],
})
export class ResponsiveModule {
  static forRoot(): ModuleWithProviders<ResponsiveModule> {
    return {
      ngModule: ResponsiveModule,
      providers: [ResponsiveService],
    };
  }
}
