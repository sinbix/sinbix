import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { RouterModule } from '@angular/router';
import { GAMES_ROUTES } from './games.routes';

@NgModule({
  declarations: [GamesComponent],
  imports: [RouterModule.forChild(GAMES_ROUTES), CommonModule],
})
export class GamesModule {}
