import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AUTH_CLIENT, BLOG_CLIENT } from './clients.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_CLIENT,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          queue: 'auth_queue',
        },
      },
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
  exports: [ClientsModule],
})
export class UtilsClientsModule {}
