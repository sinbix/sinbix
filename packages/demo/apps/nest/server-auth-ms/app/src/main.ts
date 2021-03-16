/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { RootModule } from './root';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RootModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
        queue: 'auth_queue',
      },
    }
  );
  app.listen(() => Logger.log('Microservice Auth is listening'));
}

bootstrap();
