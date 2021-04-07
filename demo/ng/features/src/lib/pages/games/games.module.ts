import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiGamesModule } from '@sinbix/demo/ng/ui/games';
import { ListComponent } from './pages/list';
import { GameComponent } from './pages/game';
import { GamesComponent } from './games.component';
import { GAMES_ROUTES } from './games.routes';

@NgModule({
  declarations: [GamesComponent, ListComponent, GameComponent],
  imports: [RouterModule.forChild(GAMES_ROUTES), CommonModule, UiGamesModule],
})
export class GamesModule {}
