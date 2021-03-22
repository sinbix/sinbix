import { LocalStorage } from '../../storage';
import { ThemeOpts } from './models';

export const THEME_DEFAULT_OPTS: ThemeOpts = {
  themeStorageOpts: {
    storageService: LocalStorage,
    key: 'sinbix-theme',
  },
};
