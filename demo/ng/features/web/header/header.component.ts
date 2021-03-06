import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthQuery, AuthService } from '@sinbix/demo/ng/data-access/auth';
import { GUEST_MENU, MAIN_MENU } from '../utils';

@Component({
  selector: 'feat-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  mainMenu = MAIN_MENU;
  guestMenu = GUEST_MENU;

  email$ = this.authQuery.email$;

  isLoggedIn$ = this.authQuery.isAuth$;

  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.signout();
  }
}
