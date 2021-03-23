import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MAIN_MENU } from '../../utils';

@Component({
  selector: 'client-web-features-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  mainMenu = MAIN_MENU;

  constructor() {}

  ngOnInit(): void {}
}
