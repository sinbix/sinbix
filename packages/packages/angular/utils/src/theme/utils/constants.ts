import { LocalStorage } from '../../storage';
import { ThemeOpts } from './models';

export const THEME_DEFAULT_OPTS: ThemeOpts = {
  themeStorageOpts: {
    storage: LocalStorage,
    storageKey: 'sinbix-theme',
  },
};
