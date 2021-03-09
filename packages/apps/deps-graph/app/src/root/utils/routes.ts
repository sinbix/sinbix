import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/apps/deps-graph/features').then(
        (m) => m.DepsGraphFeaturesModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
