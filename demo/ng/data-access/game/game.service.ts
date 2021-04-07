import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { GameStore, PaginationState } from './game.store';
import { GameQuery } from './game.query';
import { GameApiService } from './api';
import { SxLocalStorage } from '@sinbix-angular/common/storage';
import { Sort } from '@angular/material/sort';
import { IGameFilter } from '@sinbix/demo/ng/utils/game';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private store: GameStore,
    private query: GameQuery,
    private storage: SxLocalStorage,
    private apiService: GameApiService
  ) {}

  getGames() {
    this.apiService.games().subscribe((res) => {
      this.store.update({
        categories: res.categories.map((category) => ({
          id: category.ID,
          name: category.Name['en'],
        })),
        merchants: _.values(res.merchants).map((merchant) => ({
          id: merchant.ID,
          name: merchant.Name,
        })),
      });

      this.store.set(
        res.games.map((game) => ({
          id: game.ID,
          categories: game.CategoryID.map((categoryId) =>
            this.query.getCategory(categoryId)
          ).filter((category) => category),
          merchant: this.query.getMerchant(game.MerchantID),
          name: game.Name['en'],
          image: game.ImageFullPath,
          step: 0,
        }))
      );

      this.favoritesInit();
    });
  }

  toggleFavorite(id: ID) {
    this.store.toggleActive([id]);
    this.storage.setItem('favorites', JSON.stringify(this.query.getActiveId()));
  }

  setStep(id: ID, step: number) {
    this.store.update(id, () => {
      return { step };
    });
  }

  setPagination(pagination: PaginationState) {
    this.store.update((state) => ({
      ui: {
        ...state.ui,
        pagination,
      },
    }));
  }

  sort(sort: Sort) {
    this.store.update((state) => ({
      ui: {
        ...state.ui,
        sort,
      },
    }));
  }

  favoriteSort(sortFavorite: boolean) {
    this.store.update((state) => ({
      ui: {
        ...state.ui,
        sortFavorite,
      },
    }));
  }

  filter(filter: IGameFilter) {
    this.store.update((state) => ({
      ui: {
        ...state.ui,
        filter,
      },
    }));
  }

  private async favoritesInit() {
    const favorites = await this.storage.getItem('favorites');
    if (favorites?.length) {
      this.store.setActive(JSON.parse(favorites));
    }
  }
}
