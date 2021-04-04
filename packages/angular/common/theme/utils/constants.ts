import { SxLocalStorage } from '@sinbix-angular/common/storage';
import { ThemeOpts } from './models';

export const THEME_DEFAULT_OPTS: ThemeOpts = {
  themeStorageOpts: {
    storage: SxLocalStorage,
    storageKey: 'sinbix-theme',
  },
};
