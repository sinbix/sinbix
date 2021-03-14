import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to demo/apps/nest/server-blog-ms/app!' };
  }
}
