import { Module } from '@sinbix-nest/common';
import { ServicesGameModule } from '@sinbix/demo/nest/services/game';
import { UtilsClientsModule } from '@sinbix/demo/nest/utils/clients';
import { GameController } from './game.controller';

@Module({
  imports: [ServicesGameModule, UtilsClientsModule],
  controllers: [GameController],
})
export class UiGameModule {}
