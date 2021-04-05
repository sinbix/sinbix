import { Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./pages/blog').then((m) => m.BlogModule),
      },
      {
        path: 'games',
        loadChildren: () => import('./pages/games').then((m) => m.GamesModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth').then((m) => m.AuthModule),
      },
    ],
  },
];
