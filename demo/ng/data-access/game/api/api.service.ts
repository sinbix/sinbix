import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/utils/game';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GAME_URL_TOKEN } from '../utils';

@Injectable({ providedIn: 'root' })
export class GameApiService implements IGamesGateway {
  constructor(
    private httpClient: HttpClient,
    @Inject(GAME_URL_TOKEN) private url: string
  ) {}

  games(): Observable<IGamesApiData> {
    return this.httpClient.get<IGamesApiData>(`${this.url}/games`).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }
}
