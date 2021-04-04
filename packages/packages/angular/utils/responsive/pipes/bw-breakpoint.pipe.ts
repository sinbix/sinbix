import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { SxResponsiveService } from '../responsive.service';

@Pipe({
  name: 'bwBreakpoint',
})
export class BwBreakpointPipe implements PipeTransform {
  constructor(private responsiveService: SxResponsiveService) {}

  transform(value: Range, ssr: boolean): Observable<boolean> {
    return this.responsiveService.between(value, ssr);
  }
}
