import { Logger } from '@sinbix-nest/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@sinbix-nest/microservices';

import { RootModule } from './root';

NestFactory.createMicroservice<MicroserviceOptions>(RootModule, {
  transport: Transport.NATS,
  options: {
    url: 'nats://localhost:4222',
    queue: 'auth_queue',
  },
}).then((app) => {
  app.listen(() => Logger.log('Microservice Auth is listening'));
});
