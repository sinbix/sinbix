import { enableProdMode } from '@angular/core';

import { environment } from '@sinbix/demo/ng/utils/environments';

if (environment.production) {
  enableProdMode();
}

export { RootServerModule } from './root/root.server.module';

export { renderModule, renderModuleFactory } from '@angular/platform-server';
