import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { GamesStore, PaginationState } from './games.store';
import { GamesQuery } from './games.query';
import { SxLocalStorage } from '@sinbix-angular/common/storage';
import { GamesApiService } from './api';
import * as _ from 'lodash';
import { Sort } from '@angular/material/sort';
import { IGamesFilter } from '@sinbix/demo/ng/utils/games';

@Injectable({ providedIn: 'root' })
export class GamesService {
  constructor(
    private store: GamesStore,
    private query: GamesQuery,
    private storage: SxLocalStorage,
    private apiService: GamesApiService
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

  filter(filter: IGamesFilter) {
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
