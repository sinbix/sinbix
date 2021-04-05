import { Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { GameComponent } from './pages/game';
import { ListComponent } from './pages/list';

export const GAMES_ROUTES: Routes = [
  {
    path: '',
    component: GamesComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'game/:id',
        component: GameComponent,
      },
    ],
  },
];
