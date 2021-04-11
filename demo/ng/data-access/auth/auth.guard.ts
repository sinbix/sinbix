import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthQuery } from './auth.query';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private query: AuthQuery, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.query.getToken()) {
      this.router.navigate(['/']);
    }

    return true;
  }
}
