import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ThemeService, ThemeQuery } from '@sinbix-angular/utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'smat-theme-toggle-lida-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeToggleLidaButtonComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() lightThemeId = 'light';

  @Input() darkThemeId = 'dark';

  isDark$ = this.themeQuery
    .selectActiveId()
    .pipe(map((themeId) => themeId === this.darkThemeId));

  constructor(
    private themeService: ThemeService,
    private themeQuery: ThemeQuery
  ) {}

  ngOnInit(): void {}

  onToggle(isDark: boolean) {
    this.themeService.setTheme(isDark ? this.darkThemeId : this.lightThemeId);
  }
}
