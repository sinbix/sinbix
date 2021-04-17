import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gamesUrl } from '@sinbix/demo/ng/data-access/game';

@Injectable()
export class GamesInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const gamesReq = req.clone({
      url: req.url === gamesUrl ? '/games.json' : req.url,
    });

    return next.handle(gamesReq);
  }
}
