import { Module } from '@sinbix-nest/common';
import { ServicesGameModule } from '@sinbix/demo/nest/services/game';
import { GameController } from './game.controller';

@Module({
  imports: [ServicesGameModule],
  controllers: [GameController],
})
export class UiGameModule {}
