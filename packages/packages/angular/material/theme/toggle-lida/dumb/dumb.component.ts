import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TLightDarkTheme } from '../utils';

@Component({
  selector: 'sinbix-theme-toggle-lida-dumb',
  templateUrl: './dumb.component.html',
  styleUrls: ['./dumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeToggleLidaDumbComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() color: ThemePalette;

  @Input() isDark = false;

  @Input() type: TLightDarkTheme = 'slide';

  ngOnInit(): void {}

  onToggle() {
    this.toggleEvent.emit(!this.isDark);
  }
}
