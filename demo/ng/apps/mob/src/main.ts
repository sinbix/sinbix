import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@sinbix/demo/ng/utils/environments';

import { RootModule } from './root';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .catch((err) => console.error(err));
