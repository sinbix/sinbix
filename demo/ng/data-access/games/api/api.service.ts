import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/utils/game';
import { environment } from '@sinbix/demo/ng/utils/environments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamesApiService implements IGamesGateway {
  constructor(private httpClient: HttpClient) {}

  games(): Observable<IGamesApiData> {
    return this.httpClient.get<IGamesApiData>(
      `${environment.serverUri}/api/game/games`
    );
  }
}