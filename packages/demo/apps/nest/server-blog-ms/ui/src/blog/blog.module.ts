import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { ServicesBlogModule } from '@sinbix/demo/apps/nest/server-blog-ms/services';

@Module({
  imports: [ServicesBlogModule],
  controllers: [BlogController],
})
export class BlogModule {}
