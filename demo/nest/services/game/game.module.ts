import { Module } from '@sinbix-nest/common';
import { GameService } from './game.service';

@Module({
  providers: [GameService],
  exports: [GameService],
})
export class ServicesGameModule {}
