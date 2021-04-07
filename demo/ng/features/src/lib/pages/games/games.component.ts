import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GamesService } from '@sinbix/demo/ng/data-access/games';

@Component({
  selector: 'feat-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesComponent implements OnInit {
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    this.gamesService.getGames();
  }
}
