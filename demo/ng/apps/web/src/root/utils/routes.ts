import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/demo/ng/features/src').then(
        (m) => m.FeaturesModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
