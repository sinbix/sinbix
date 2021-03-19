import { Controller, Get } from '@nestjs/common';
import { GameService } from '@sinbix/demo/apps/nest/server/services';

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('games')
  games(data: any) {
    return this.gameService.games();
  }
}
