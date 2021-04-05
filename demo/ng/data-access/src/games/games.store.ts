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
} from '@sinbix/demo/shared/types';
import { IGamesFilter } from '@sinbix/demo/ng/utils';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface GamesState extends EntityState<IGame>, MultiActiveState {
  categories: IGameCategory[];
  merchants: IGameMerchant[];
  ui: {
    pagination: PaginationState;
    sort: Sort;
    sortFavorite: boolean;
    filter: IGamesFilter;
  };
}

function createInitialState(): Partial<GamesState> {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'games' })
export class GamesStore extends EntityStore<GamesState, IGame> {
  constructor() {
    super(createInitialState());
  }
}
