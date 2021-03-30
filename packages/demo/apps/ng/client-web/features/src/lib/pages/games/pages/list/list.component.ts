import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

import { IGamesFilter } from '@sinbix/demo/apps/ng/client-web/utils';

import {
  GamesQuery,
  GamesService,
} from '@sinbix/demo/apps/ng/client-web/data-access';
import { StepEvent } from '@sinbix/demo/apps/ng/client-web/ui';

@Component({
  selector: 'feat-games-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  categories$ = this.gamesQuery.categories$;
  merchants$ = this.gamesQuery.merchants$;

  games$ = this.gamesQuery.paginatedGames$;

  length$ = this.gamesQuery.filteredGamesCount$;

  pageIndex$ = this.gamesQuery.pageIndex$;
  pageSize$ = this.gamesQuery.pageSize$;

  sort$ = this.gamesQuery.sort$;
  sortFavorite$ = this.gamesQuery.sortFavorite$;

  filterSearch$ = this.gamesQuery.filterSearch$;

  filterCategories$ = this.gamesQuery.filterCategories$;

  filterMerchants$ = this.gamesQuery.filterMerchants$;

  favorites$ = this.gamesQuery.favorites$;

  constructor(
    private titleService: Title,
    private gamesService: GamesService,
    private gamesQuery: GamesQuery // private gamesQuery: GamesQuery, // private gamesService: GamesService, // private gamesPaginationQuery: GamesPaginationQuery, // private gamesPaginationService: GamesPaginationService, // private gamesOptionsService: GamesOptionsService, // private gamesOptionsQuery: GamesOptionsQuery, // private categoriesQuery: CategoriesQuery, // private merchantsQuery: MerchantsQuery
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Egamings | Home');
  }

  onSort(sort: Sort) {
    this.gamesService.sort(sort);
  }

  onFavoriteSort(sortFavorite: boolean) {
    this.gamesService.favoriteSort(sortFavorite);
  }

  onFilters(filter: IGamesFilter) {
    this.gamesService.filter(filter);
  }

  onPage(page: PageEvent) {
    this.gamesService.setPagination({
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
    });
  }

  onFavorite(id: number) {
    this.gamesService.toggleFavorite(id);
  }

  onStep(stepEvent: StepEvent) {
    const { id, step } = stepEvent;
    this.gamesService.setStep(id, step);
  }
}
