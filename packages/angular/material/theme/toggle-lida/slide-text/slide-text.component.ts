import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SxThemeService, SxThemeQuery } from '@sinbix-angular/common/theme';
import { map } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'smat-theme-toggle-lida-slide-text',
  templateUrl: './slide-text.component.html',
  styleUrls: ['./slide-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeToggleLidaSlideTextComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() lightThemeId = 'light';

  @Input() darkThemeId = 'dark';

  isDark$ = this.themeQuery
    .selectActiveId()
    .pipe(map((themeId) => themeId === this.darkThemeId));

  constructor(
    private themeService: SxThemeService,
    private themeQuery: SxThemeQuery
  ) {}

  ngOnInit(): void {}

  onToggle(event: MatSlideToggleChange) {
    this.themeService.setTheme(
      event.checked ? this.darkThemeId : this.lightThemeId
    );
  }
}
