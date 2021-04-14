import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/utils/game';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GameApiService implements IGamesGateway {
  constructor(private httpClient: HttpClient) {}

  games(): Observable<IGamesApiData> {
    return this.httpClient
      .get<IGamesApiData>(`${environment.serverUri}/api/game/games`)
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
