import { Module } from '@nestjs/common';
import { ServicesGameModule } from '@sinbix/demo/apps/nest/server/services';
import { GameController } from './game.controller';

@Module({
  imports: [ServicesGameModule],
  controllers: [GameController],
})
export class UiGameModule {}
