import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthQuery } from './auth.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authQuery.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + authToken),
    });
    return next.handle(authRequest);
  }
}
