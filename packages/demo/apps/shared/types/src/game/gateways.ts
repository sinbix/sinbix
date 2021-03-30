import { Observable } from 'rxjs';
import { IGamesApiData } from './models';

export interface IGamesGateway {
  games(): Observable<IGamesApiData>;
}
