import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../responsive.service';

@Pipe({
  name: 'bwBreakpoint',
})
export class BwBreakpointPipe implements PipeTransform {
  constructor(private responsiveService: ResponsiveService) {}

  transform(value: Range, ssr: boolean): Observable<boolean> {
    return this.responsiveService.between(value, ssr);
  }
}
