import { ModuleWithProviders, NgModule } from '@angular/core';
import { GameQuery } from './game.query';
import { GameService } from './game.service';
import { GameStore } from './game.store';
import { GAME_URL_TOKEN } from './utils';

@NgModule()
export class DataAccessGameModule {
  static forRoot(url: string): ModuleWithProviders<DataAccessGameModule> {
    return {
      ngModule: DataAccessGameModule,
      providers: [
        GameQuery,
        GameService,
        GameStore,
        { provide: GAME_URL_TOKEN, useValue: url },
      ],
    };
  }
}
