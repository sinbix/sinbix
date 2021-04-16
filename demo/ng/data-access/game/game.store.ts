import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

import {
  StoreConfig,
  EntityState,
  EntityStore,
  MultiActiveState,
} from '@datorama/akita';

import {
  IGame,
  IGameCategory,
  IGameMerchant,
} from '@sinbix/demo/shared/utils/game';
import { IGameFilter } from '@sinbix/demo/ng/utils/game';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface GameState extends EntityState<IGame>, MultiActiveState {
  categories: IGameCategory[];
  merchants: IGameMerchant[];
  ui: {
    pagination: PaginationState;
    sort: Sort;
    sortFavorite: boolean;
    filter: IGameFilter;
  };
}

function createInitialState(): Partial<GameState> {
  return {};
}

@Injectable()
@StoreConfig({ name: 'game' })
export class GameStore extends EntityStore<GameState, IGame> {
  constructor() {
    super(createInitialState());
  }
}
