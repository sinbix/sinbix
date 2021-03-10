import { NgModule, ModuleWithProviders } from '@angular/core';

import { ScreenService } from './screen.service';
import { ScreenStore } from './screen.store';
import { ScreenQuery } from './screen.query';

@NgModule({
  providers: [ScreenService, ScreenStore, ScreenQuery],
})
export class SinbixScreenModule {
  // static forRoot(): ModuleWithProviders<SinbixScreenModule> {
  //   return {
  //     ngModule: SinbixScreenModule,
  //     providers: [ScreenService, ScreenStore, ScreenQuery],
  //   };
  // }

  constructor(private screenService: ScreenService) {}
}
