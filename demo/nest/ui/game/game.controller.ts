import { Controller, Get } from '@sinbix-nest/common';
import { GameService } from '@sinbix/demo/nest/services/game';
import { IGamesApiData, IGamesGateway } from '@sinbix/demo/shared/types';
import { Observable } from 'rxjs';

@Controller('game')
export class GameController implements IGamesGateway {
  constructor(private gameService: GameService) {}

  @Get('games')
  games(): Observable<IGamesApiData> {
    return this.gameService.games();
  }
}