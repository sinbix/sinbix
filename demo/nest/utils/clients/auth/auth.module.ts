import { Module } from '@sinbix-nest/common';
import { MsClientsModule, Transport } from '@sinbix-nest/microservices';

import { AUTH_CLIENT } from './auth.constants';
import { AuthGqlGuard } from './auth.guard';

@Module({
  imports: [
    MsClientsModule.register([
      {
        name: AUTH_CLIENT,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          queue: 'auth_queue',
        },
      },
    ]),
  ],
  providers: [AuthGqlGuard],
  exports: [MsClientsModule],
})
export class UtilsClientsAuthModule {}
