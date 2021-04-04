import * as _ from 'lodash';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Storage } from '@sinbix-angular/utils/storage';
import { SxThemeService } from './theme.service';
import { ThemeStore } from './theme.store';
import { SxThemeQuery } from './theme.query';
import { THEME_OPTS_TOKEN, THEME_DEFAULT_OPTS, ThemeOpts } from './utils';

@NgModule()
export class SxThemeModule {
  static forRoot(
    opts?: Partial<ThemeOpts>
  ): ModuleWithProviders<SxThemeModule> {
    const themeOpts = _.merge(THEME_DEFAULT_OPTS, opts);

    return {
      ngModule: SxThemeModule,
      providers: [
        ThemeStore,
        SxThemeQuery,
        SxThemeService,
        {
          provide: Storage,
          useExisting: themeOpts.themeStorageOpts.storage,
        },
        { provide: THEME_OPTS_TOKEN, useValue: themeOpts },
      ],
    };
  }

  constructor(private themeService: SxThemeService) {}
}
