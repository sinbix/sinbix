import { Module } from '@sinbix-nest/common';
import { ServicesGameModule } from '@sinbix/demo/apps/nest/server/services';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { GameController } from './game.controller';

@Module({
  imports: [ServicesGameModule, UtilsClientsModule],
  controllers: [GameController],
})
export class UiGameModule {}
