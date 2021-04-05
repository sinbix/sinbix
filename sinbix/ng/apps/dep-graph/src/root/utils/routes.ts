import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/sinbix/ng/features').then((m) => m.FeaturesModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
