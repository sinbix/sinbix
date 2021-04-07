import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService } from '@sinbix/demo/ng/data-access/game';

@Component({
  selector: 'feat-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    this.gameService.getGames();
  }
}
