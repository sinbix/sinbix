import { Observable } from 'rxjs';
import { IGamesApiData } from './game.models';

export interface IGamesGateway {
  games(): Observable<IGamesApiData>;
}
