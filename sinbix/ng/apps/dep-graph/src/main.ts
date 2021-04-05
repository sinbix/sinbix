import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './root';
import { environment } from '@sinbix/sinbix/ng/utils/environments';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .catch((err) => console.error(err));
