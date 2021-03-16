import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { RootModule } from './root';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RootModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:5222',
        queue: 'blog_queue',
      },
    }
  );
  app.listen(() => Logger.log('Microservice Blog is listening'));
}

bootstrap();
