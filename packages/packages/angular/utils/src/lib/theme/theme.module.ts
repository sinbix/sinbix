import * as _ from 'lodash';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AStorageService } from '../storage';

import { IThemeOpts } from './theme-opts.model';
import { THEME_DEFAULT_OPTS } from './theme-default-opts';
import { ThemeService } from './theme.service';
import { ThemeStore } from './theme.store';
import { ThemeQuery } from './theme.query';
import { THEME_OPTS_TOKEN } from './theme-opts.token';

@NgModule()
export class SinbixThemeModule {
  static forRoot(
    opts?: IThemeOpts
  ): ModuleWithProviders<SinbixThemeModule> {
    const themeOpts = _.merge(THEME_DEFAULT_OPTS, opts);

    return {
      ngModule: SinbixThemeModule,
      providers: [
        ThemeStore,
        ThemeQuery,
        ThemeService,
        {
          provide: AStorageService,
          useExisting: themeOpts.themeStorage.storage,
        },
        { provide: THEME_OPTS_TOKEN, useValue: themeOpts },
      ],
    };
  }

  constructor(private themeService: ThemeService) {}
}
