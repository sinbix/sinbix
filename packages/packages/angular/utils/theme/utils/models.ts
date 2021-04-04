import { Type } from '@angular/core';
import { Storage } from '@sinbix-angular/utils/storage';

export interface Theme {
  themeId: string;
  cssClass?: string;
  cssFile?: string;
}

export interface ThemeStorageOpts {
  storage: Type<Storage>;
  storageKey?: string;
}

export interface ThemeOpts {
  themeStorageOpts?: ThemeStorageOpts;
  themes?: Theme[];
  defaultThemeId?: string;
}
