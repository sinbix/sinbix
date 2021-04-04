import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Debounce } from '@sinbix-common/utils';

import { Screen } from './utils';

export function createInitialState(): Screen {
  return {
    width: 0,
    height: 0,
    orientation: 'landscape',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sceen' })
export class SxScreenStore extends Store<Screen> {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any
  ) {
    super(createInitialState());
    if (isPlatformBrowser(this.platformId)) {
      const window = this.document.defaultView;

      this.windowResizeHandler(window);

      window.addEventListener('resize', (event) =>
        this.windowDebounceResizeHandler(event)
      );
    }
  }

  @Debounce(100)
  private windowDebounceResizeHandler(event: any): void {
    this.windowResizeHandler(event.target);
  }

  private windowResizeHandler(window: Window): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.update({
      height,
      width,
      orientation: height
        ? width / height > 1
          ? 'landscape'
          : 'portrait'
        : 'landscape',
    });
  }
}
