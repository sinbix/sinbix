import { validator } from '@sinbix-common/validator';
import {
  HttpValidator,
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@sinbix-nest/common';
import { ClientProxy, MsClient } from '@sinbix-nest/microservices';
import { GameService } from '@sinbix/demo/apps/nest/server/services';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('games')
  games() {
    return this.gameService.games();
  }
}
