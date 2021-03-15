import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BLOG_CLIENT } from './clients.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BLOG_CLIENT,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          queue: 'blog_queue',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class UtilsClientsModule {}
