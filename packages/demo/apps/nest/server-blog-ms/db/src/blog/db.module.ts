import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DB_ORMCONFIG from './db.ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(DB_ORMCONFIG)],
})
export class BlogDbModule {}
