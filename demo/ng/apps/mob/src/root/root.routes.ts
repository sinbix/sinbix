import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/demo/ng/features/mob').then((m) => m.MobModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
