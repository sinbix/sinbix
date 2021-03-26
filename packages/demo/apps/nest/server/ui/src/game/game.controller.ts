import { Controller, Get } from '@sinbix-nest/common';
import { GameService } from '@sinbix/demo/apps/nest/server/services';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('games')
  games() {
    return this.gameService.games();
  }
}
