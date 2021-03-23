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
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'smat-theme-toggle-lida-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeToggleLidaSlideComponent implements OnInit {
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

  onToggle(event: MatSlideToggleChange) {
    this.themeService.setTheme(
      event.checked ? this.darkThemeId : this.lightThemeId
    );
  }
}
