import { Routes } from '@angular/router';
import { GameComponent, ListComponent } from './ui';
import { GamesComponent } from './games.component';

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
