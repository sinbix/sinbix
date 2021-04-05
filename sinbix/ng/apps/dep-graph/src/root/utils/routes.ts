import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/sinbix/dep-graph/features').then((m) => m.FeaturesModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
