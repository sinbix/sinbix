import { Injectable } from '@sinbix-nest/common';
import type { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/types/game';
import * as fs from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';

@Injectable()
export class GameService implements IGamesGateway {
  games(): Observable<IGamesApiData> {
    return new Observable((subscriber) => {
      subscriber.next(
        JSON.parse(fs.readFileSync(join(__dirname, 'games.json')).toString())
      );
      subscriber.complete();
    });
  }
}
