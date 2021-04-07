import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

import { IGameFilter } from '@sinbix/demo/ng/utils/game';

import { GameQuery, GameService } from '@sinbix/demo/ng/data-access/game';
import { StepEvent } from '@sinbix/demo/ng/ui/game';

@Component({
  selector: 'feat-games-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  categories$ = this.gameQuery.categories$;
  merchants$ = this.gameQuery.merchants$;

  games$ = this.gameQuery.paginatedGames$;

  length$ = this.gameQuery.filteredGamesCount$;

  pageIndex$ = this.gameQuery.pageIndex$;
  pageSize$ = this.gameQuery.pageSize$;

  sort$ = this.gameQuery.sort$;
  sortFavorite$ = this.gameQuery.sortFavorite$;

  filterSearch$ = this.gameQuery.filterSearch$;

  filterCategories$ = this.gameQuery.filterCategories$;

  filterMerchants$ = this.gameQuery.filterMerchants$;

  favorites$ = this.gameQuery.favorites$;

  constructor(
    private titleService: Title,
    private gameService: GameService,
    private gameQuery: GameQuery
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Demo | Games');
  }

  onSort(sort: Sort) {
    this.gameService.sort(sort);
  }

  onFavoriteSort(sortFavorite: boolean) {
    console.log(sortFavorite);
    this.gameService.favoriteSort(sortFavorite);
  }

  onFilters(filter: IGameFilter) {
    this.gameService.filter(filter);
  }

  onPage(page: PageEvent) {
    this.gameService.setPagination({
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
    });
  }

  onFavorite(id: number) {
    this.gameService.toggleFavorite(id);
  }

  onStep(stepEvent: StepEvent) {
    const { id, step } = stepEvent;
    this.gameService.setStep(id, step);
  }
}
