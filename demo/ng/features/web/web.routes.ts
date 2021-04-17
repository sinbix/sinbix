import { Routes } from '@angular/router';
import { AuthGuard } from '@sinbix/demo/ng/data-access/auth';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { WebComponent } from './web.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@sinbix/demo/ng/features/home').then((m) => m.HomeModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('@sinbix/demo/ng/features/blog').then((m) => m.BlogModule),
      },
      {
        path: 'games',
        loadChildren: () =>
          import('@sinbix/demo/ng/features/games').then((m) => m.GamesModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@sinbix/demo/ng/features/auth').then((m) => m.AuthModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];
