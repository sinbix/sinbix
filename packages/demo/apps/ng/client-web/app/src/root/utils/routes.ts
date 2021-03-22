import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@sinbix/demo/apps/ng/client-web/features').then(
        (m) => m.FeaturesModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
