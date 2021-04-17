import { NgModule } from '@angular/core';
import { GameApiService } from './api';
import { GameQuery } from './game.query';
import { GameService } from './game.service';
import { GameStore } from './game.store';

@NgModule({ providers: [GameApiService, GameQuery, GameService, GameStore] })
export class DataAccessGameModule {}
