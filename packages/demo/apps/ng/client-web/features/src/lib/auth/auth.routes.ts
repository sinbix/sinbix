import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
