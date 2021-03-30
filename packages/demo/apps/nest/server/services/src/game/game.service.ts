import { Injectable } from '@sinbix-nest/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class GameService {
  games() {
    return JSON.parse(
      fs.readFileSync(join(__dirname, 'assets/games.json')).toString()
    );
  }
}
