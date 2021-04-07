import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiGamesModule } from '@sinbix/demo/ng/ui/games';
import { ListComponent, GameComponent } from './ui';
import { GamesComponent } from './games.component';
import { GAMES_ROUTES } from './games.routes';

@NgModule({
  declarations: [GamesComponent, ListComponent, GameComponent],
  imports: [RouterModule.forChild(GAMES_ROUTES), CommonModule, UiGamesModule],
})
export class GamesModule {}
