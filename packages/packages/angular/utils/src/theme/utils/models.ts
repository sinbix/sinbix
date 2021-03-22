import { Type } from '@angular/core';
import { Storage } from '../../storage';

export interface Theme {
  themeId: string;
  cssClass?: string;
  cssFile?: string;
}

export interface ThemeStorageOpts {
  storageService: Type<Storage>;
  key: string;
}

export interface ThemeOpts {
  themeStorageOpts?: ThemeStorageOpts;
  themes?: Theme[];
  defaultThemeId?: string;
}
