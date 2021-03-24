import { Routes } from '@angular/router';
import { FeaturesComponent } from '../features.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home').then((m) => m.HomeModule),
      },
    ],
  },
];
