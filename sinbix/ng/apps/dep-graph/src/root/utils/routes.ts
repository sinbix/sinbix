import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/sinbix/ng/features/dep-graph').then(
        (m) => m.DepGraphModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
