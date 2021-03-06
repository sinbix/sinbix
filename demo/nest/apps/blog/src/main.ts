import { MicroserviceOptions, Transport } from '@sinbix-nest/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@sinbix-nest/common';

import { RootModule } from './root';

NestFactory.createMicroservice<MicroserviceOptions>(RootModule, {
  transport: Transport.NATS,
  options: {
    url: 'nats://localhost:5222',
    queue: 'blog_queue',
  },
}).then((app) => {
  app.listen(() => Logger.log('Microservice Blog is listening'));
});
