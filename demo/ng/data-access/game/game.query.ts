import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { map, mergeMap } from 'rxjs/operators';

import { IGame } from '@sinbix/demo/shared/utils/game';
import { IGameFilter } from '@sinbix/demo/ng/utils/game';

import { GameStore, GameState } from './game.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC,
})
export class GameQuery extends QueryEntity<GameState, IGame> {
  constructor(protected store: GameStore) {
    super(store);
  }

  categories$ = this.select((state) => state.categories);
  merchants$ = this.select((state) => state.merchants);

  filteredGames$ = this.select([
    (state) => state.ui?.sort,
    (state) => state.ui?.sortFavorite,
    (state) => state.ui?.filter,
  ]).pipe(
    mergeMap((params) => {
      const [sort, sortFavorite, filter] = params;
      return this.selectAll().pipe(
        map((games) => {
          games = this.filterGames(games, filter);
          games = this.sortGames(games, sort, sortFavorite);
          return games;
        })
      );
    })
  );

  paginatedGames$ = this.select((state) => state.ui?.pagination).pipe(
    mergeMap((pagination) => {
      return this.filteredGames$.pipe(
        map((games) => {
          const { pageIndex, pageSize } = pagination;
          const start = pageIndex * pageSize;
          return games.slice(start, start + pageSize);
        })
      );
    })
  );

  filteredGamesCount$ = this.filteredGames$.pipe(map((games) => games.length));

  pageIndex$ = this.select((state) => state.ui?.pagination?.pageIndex);
  pageSize$ = this.select((state) => state.ui?.pagination?.pageSize);

  sort$ = this.select((state) => state.ui?.sort);

  sortFavorite$ = this.select((state) => state.ui?.sortFavorite);

  filterSearch$ = this.select((state) => state.ui?.filter?.search);

  filterCategories$ = this.select((state) => state.ui?.filter?.categories);

  filterMerchants$ = this.select((state) => state.ui?.filter?.merchants);

  favorites$ = this.selectActiveId();

  getCategory(id: number) {
    return (this.getValue().categories ?? []).find(
      (category) => category.id === id
    );
  }

  getMerchant(id: number) {
    return (this.getValue().merchants ?? []).find(
      (merchant) => merchant.id === id
    );
  }

  private filterGames(games: IGame[], filter: IGameFilter) {
    return games.filter((game) => {
      return (
        this.filterName(game, filter?.search) &&
        this.filterCategories(game, filter?.categories) &&
        this.filterMerchants(game, filter?.merchants)
      );
    });
  }

  private filterName(game: IGame, name: string) {
    return name ? game.name.toLowerCase().includes(name?.toLowerCase()) : true;
  }

  private filterCategories(game: IGame, categoryIds: number[]) {
    if (categoryIds?.length) {
      for (const categoryId of categoryIds) {
        if (categoryId === -1 && this.hasActive(game.id)) {
          return true;
        }
        for (const gameCategory of game.categories) {
          if (categoryId === gameCategory.id) {
            return true;
          }
        }
      }
      return false;
    }

    return true;
  }

  private filterMerchants(game: IGame, merchantIds: number[]) {
    if (merchantIds?.length) {
      for (const merchantId of merchantIds) {
        if (merchantId === game.merchant.id) {
          return true;
        }
      }
      return false;
    }

    return true;
  }

  private sortGames(games: IGame[], sort: Sort, sortFavorite: boolean) {
    return games?.length
      ? games.sort((a, b) => {
          if (sortFavorite) {
            const activeA = this.hasActive(a.id);
            const activeB = this.hasActive(b.id);

            if (activeA && !activeB) {
              return -1;
            }

            if (activeB && !activeA) {
              return 1;
            }
          }

          if (a.step > b.step) {
            return -1;
          } else if (a.step < b.step) {
            return 1;
          }

          const active = sort?.active;
          let dir = sort?.direction;
          let fieldA;
          let fieldB;

          if (dir) {
            fieldA = _.get(a, active);
            fieldB = _.get(b, active);
          } else {
            dir = 'asc';
            fieldA = a.name;
            fieldB = b.name;
          }

          if (typeof fieldA === 'string') {
            fieldA = fieldA.toLowerCase();
            fieldB = fieldB.toLowerCase();
          }

          if (fieldA < fieldB) {
            return dir === 'asc' ? -1 : 1;
          } else if (fieldA > fieldB) {
            return dir === 'asc' ? 1 : -1;
          }

          return 0;
        })
      : games;
  }
}
