import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'client-web-features-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  isLoading$;

  constructor() {}

  ngOnInit(): void {}
}
