import * as _ from 'lodash';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IGame } from '@sinbix/demo/shared/types/game';

@Component({
  selector: 'ui-games-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesGameComponent implements OnInit {
  @Input() set game(game: IGame) {
    if (game) {
      this.categories = _.join(
        game.categories?.map((category) => category.name),
        ', '
      );
      this._game = game;
    }
  }
  get game() {
    return this._game;
  }
  private _game: IGame;

  categories: string;

  constructor() {}

  ngOnInit(): void {}
}
