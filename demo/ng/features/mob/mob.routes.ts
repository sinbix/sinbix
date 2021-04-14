import { Routes } from '@angular/router';
import { MobComponent } from './mob.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MobComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@sinbix/demo/ng/features/games').then((m) => m.GamesModule),
      },
    ],
  },
];
