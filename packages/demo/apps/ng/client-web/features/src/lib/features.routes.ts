import { Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home').then((m) => m.HomeModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog').then((m) => m.BlogModule),
      },
      {
        path: 'games',
        loadChildren: () => import('./games').then((m) => m.GamesModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth').then((m) => m.AuthModule),
      },
    ],
  },
];
