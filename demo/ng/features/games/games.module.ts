import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiGameModule } from '@sinbix/demo/ng/ui/game';
import { DataAccessGameModule } from '@sinbix/demo/ng/data-access/game';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { ListComponent, GameComponent } from './ui';
import { GamesComponent } from './games.component';
import { GAMES_ROUTES } from './games.routes';

@NgModule({
  declarations: [GamesComponent, ListComponent, GameComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(GAMES_ROUTES),
    DataAccessGameModule.forRoot(`${environment.serverUri}/api/game`),
    UiGameModule,
  ],
})
export class GamesModule {}
