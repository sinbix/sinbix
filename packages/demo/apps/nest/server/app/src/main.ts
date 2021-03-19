/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { RootModule } from './root';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
