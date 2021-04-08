import { Module } from '@sinbix-nest/common';
import { MsClientsModule, Transport } from '@sinbix-nest/microservices';

import { BLOG_CLIENT } from './blog.constants';

@Module({
  imports: [
    MsClientsModule.register([
      {
        name: BLOG_CLIENT,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:5222',
          queue: 'blog_queue',
        },
      },
    ]),
  ],
  exports: [MsClientsModule],
})
export class UtilsClientsBlogModule {}
