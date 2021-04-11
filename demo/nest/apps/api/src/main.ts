/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@sinbix-nest/common';
import { NestFactory } from '@nestjs/core';

import { RootModule } from './root';

NestFactory.create(RootModule).then(async (app) => {
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
});
