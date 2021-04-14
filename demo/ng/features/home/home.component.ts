import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthQuery } from '@sinbix/demo/ng/data-access/auth';

@Component({
  selector: 'feat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  firstName$ = this.authQuery.firstName$;

  isAuth$ = this.authQuery.isAuth$;

  constructor(private titleService: Title, private authQuery: AuthQuery) {}

  ngOnInit(): void {
    this.titleService.setTitle('Demo | Home');
  }
}
