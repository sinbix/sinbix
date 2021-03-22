import * as _ from 'lodash';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Storage } from '../storage';
import { ThemeService } from './theme.service';
import { ThemeStore } from './theme.store';
import { ThemeQuery } from './theme.query';
import { THEME_OPTS_TOKEN, THEME_DEFAULT_OPTS, ThemeOpts } from './utils';

@NgModule()
export class SinbixThemeModule {
  static forRoot(
    opts?: Partial<ThemeOpts>
  ): ModuleWithProviders<SinbixThemeModule> {
    const themeOpts = _.merge(THEME_DEFAULT_OPTS, opts);

    return {
      ngModule: SinbixThemeModule,
      providers: [
        ThemeStore,
        ThemeQuery,
        ThemeService,
        {
          provide: Storage,
          useExisting: themeOpts.themeStorageOpts.storageService,
        },
        { provide: THEME_OPTS_TOKEN, useValue: themeOpts },
      ],
    };
  }

  constructor(private themeService: ThemeService) {}
}
