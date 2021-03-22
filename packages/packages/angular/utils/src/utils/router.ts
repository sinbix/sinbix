import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SinbixRouter {
  constructor(private router: Router) {}

  isRouterLinkActive(url: string, exactMatch = false) {
    const routerUrl = this.router.url;

    return routerUrl === url || (!exactMatch && routerUrl.includes(url));
  }
}
