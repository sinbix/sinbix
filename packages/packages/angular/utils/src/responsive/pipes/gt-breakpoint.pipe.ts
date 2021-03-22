import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoint } from '../utils';
import { ResponsiveService } from '../responsive.service';

@Pipe({
  name: 'gtBreakpoint',
})
export class GtBreakpointPipe implements PipeTransform {
  constructor(private responsiveService: ResponsiveService) {}

  transform(value: Breakpoint, ssr: boolean): Observable<boolean> {
    return this.responsiveService.greaterThan(value, ssr);
  }
}
