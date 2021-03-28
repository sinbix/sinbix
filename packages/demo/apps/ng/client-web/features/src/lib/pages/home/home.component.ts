import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthQuery } from '@sinbix/demo/apps/ng/client-web/data-access';

@Component({
  selector: 'client-web-features-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  firstName$ = this.authQuery.firstName$;

  isAuth$ = this.authQuery.isAuth$;

  constructor(private authQuery: AuthQuery) {}

  ngOnInit(): void {}
}
