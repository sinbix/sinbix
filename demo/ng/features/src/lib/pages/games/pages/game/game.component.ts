import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GamesQuery } from '@sinbix/demo/ng/data-access';
import { IGame } from '@sinbix/demo/shared/types';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'feat-games-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameComponent implements OnInit {
  game$: Observable<IGame>;

  constructor(
    private titleService: Title,
    private gamesQuery: GamesQuery,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.game$ = this.route.params.pipe(
      mergeMap((params) => {
        console.log(params);
        return this.gamesQuery.selectEntity(params?.id).pipe(
          map((game) => {
            const title = game ? game.name : 'Not found';
            this.titleService.setTitle(`Demo | Games | ${title}`);
            return game;
          })
        );
      })
    );
  }
}
