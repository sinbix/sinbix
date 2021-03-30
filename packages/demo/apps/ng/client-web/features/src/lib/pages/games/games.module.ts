import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { RouterModule } from '@angular/router';
import { GAMES_ROUTES } from './games.routes';
import { UiGamesModule } from '@sinbix/demo/apps/ng/client-web/ui';
import { ListComponent } from './pages/list';
import { GameComponent } from './pages/game';

@NgModule({
  declarations: [GamesComponent, ListComponent, GameComponent],
  imports: [RouterModule.forChild(GAMES_ROUTES), CommonModule, UiGamesModule],
})
export class GamesModule {}
