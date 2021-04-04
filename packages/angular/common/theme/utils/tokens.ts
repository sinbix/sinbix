import { InjectionToken } from '@angular/core';
import { ThemeOpts } from './models';

export const THEME_OPTS_TOKEN = new InjectionToken<ThemeOpts>(
  'sinbix.theme.opts'
);
