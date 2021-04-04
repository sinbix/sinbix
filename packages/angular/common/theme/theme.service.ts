import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';

import { SxGlobalRenderer } from '@sinbix-angular/common/utils';
import { Storage } from '@sinbix-angular/common/storage';
import { ThemeStore } from './theme.store';
import { SxThemeQuery } from './theme.query';
import { Theme, ThemeOpts, THEME_OPTS_TOKEN } from './utils';

@Injectable()
export class SxThemeService {
  private head: HTMLHeadElement;
  private body: HTMLElement;
  private themeLinks: HTMLElement[] = [];

  constructor(
    private themeStore: ThemeStore,
    private themeQuery: SxThemeQuery,
    private renderer: SxGlobalRenderer,
    private storageService: Storage,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(THEME_OPTS_TOKEN) private opts?: ThemeOpts
  ) {
    this.head = this.document.head;
    this.body = this.document.body;

    const { themes, defaultThemeId } = this.opts;

    this.addThemes(themes, defaultThemeId);
  }

  async addThemes(themes: Theme[], defaultTheme?: string) {
    if (themes?.length) {
      this.themeStore.add(themes);

      const themeId = await this.storageService.getItem(
        this.opts.themeStorageOpts.storageKey
      );

      if (!themeId) {
        await this.setTheme(defaultTheme ? defaultTheme : themes[0].themeId);
      } else {
        await this.setTheme(themeId);
      }
    }
  }

  async setTheme(themeId: string) {
    const entity = this.themeQuery.getEntity(themeId);
    const active = this.themeQuery.getActive();

    if (entity.cssFile) {
      await this.loadCss(entity.cssFile);
    }

    if (this.themeLinks?.length >= 2) {
      this.renderer.removeChild(this.head, this.themeLinks.shift());
    }

    this.themeStore.setActive(themeId);

    if (active) {
      if (active.cssClass) {
        this.renderer.removeClass(this.body, active.cssClass);
      }
    }

    if (entity.cssClass) {
      this.renderer.addClass(this.body, entity.cssClass);
    }

    this.setThemeToStorage(themeId);
  }

  private async setThemeToStorage(themeId) {
    return this.storageService.setItem(this.opts.themeStorageOpts.storageKey, themeId);
  }

  private async loadCss(filename: string) {
    return new Promise<void>((resolve) => {
      const linkEl: HTMLElement = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkEl, 'type', 'text/css');
      this.renderer.setAttribute(linkEl, 'href', filename);
      this.renderer.setProperty(linkEl, 'onload', resolve);

      if (this.head) {
        this.renderer.insertBefore(this.head, linkEl, this.head.firstChild);
      }
      this.themeLinks = [...this.themeLinks, linkEl];

      if (isPlatformServer(this.platformId)) {
        resolve();
      }
    });
  }
}
