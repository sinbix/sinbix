import * as _ from 'lodash';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Dictionary } from 'lodash';
import { map, mergeMap } from 'rxjs/operators';

import { SxScreenQuery } from '@sinbix-angular/utils/screen';

import { Breakpoint, ResponsiveBreakpoint, Side } from './utils';

@Injectable({ providedIn: 'root' })
export class SxResponsiveService {
  private breakpoints: ResponsiveBreakpoint[] = [];

  constructor(
    private screenQuery: SxScreenQuery,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  lessThan(breakpoint: Breakpoint, ssr = false) {
    return this.checkSide(breakpoint).pipe(
      map((dir) => {
        return isPlatformBrowser(this.platformId) ? dir === Side.Left : ssr;
      })
    );
  }

  greaterThan(breakpoint: Breakpoint, ssr = false) {
    return this.checkSide(breakpoint).pipe(
      map((dir) => {
        return isPlatformBrowser(this.platformId) ? dir === Side.Right : ssr;
      })
    );
  }

  between(range: Range, ssr = false) {
    return this.checkSide(range[0]).pipe(
      mergeMap((side1) => {
        return this.checkSide(range[1]).pipe(
          map((side2) => {
            return isPlatformBrowser(this.platformId)
              ? (side1 === Side.Left && side2 === Side.Right) ||
                  (side1 === Side.Right && side2 === Side.Left)
              : ssr;
          })
        );
      })
    );
  }

  setBreakpoints(breakpoints: Dictionary<number>) {
    this.breakpoints = [];
    _.keys(breakpoints).map((key) => {
      this.breakpoints.push({
        key,
        value: breakpoints[key],
      });
    });
    this.breakpoints = _.sortBy(this.breakpoints, ['value']);
  }

  private getBreakpoint(key: string, offset?: number) {
    const index = _.findIndex(this.breakpoints, { key });
    return this.breakpoints[offset ? index + offset : index];
  }

  private checkSide(breakpoint: Breakpoint) {
    return this.screenQuery.select('width').pipe(
      map((width) => {
        const value = _.isNumber(breakpoint)
          ? breakpoint
          : _.get(this.getBreakpoint(breakpoint), 'value');

        return breakpoint !== null && width
          ? width >= value
            ? Side.Right
            : Side.Left
          : Side.Error;
      })
    );
  }
}
