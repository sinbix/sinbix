import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoint } from '../utils';
import { SxResponsiveService } from '../responsive.service';

@Pipe({
  name: 'ltBreakpoint',
})
export class LtBreakpointPipe implements PipeTransform {
  constructor(private responsiveService: SxResponsiveService) {}

  transform(value: Breakpoint, ssr: boolean): Observable<boolean> {
    return this.responsiveService.lessThan(value, ssr);
  }
}
