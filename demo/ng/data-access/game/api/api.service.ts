import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/utils/game';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { gamesUrl } from '../utils';

@Injectable()
export class GameApiService implements IGamesGateway {
  constructor(private httpClient: HttpClient) {}

  games(): Observable<IGamesApiData> {
    return this.httpClient.get<IGamesApiData>(gamesUrl).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }
}
