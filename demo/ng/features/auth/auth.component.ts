import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'feat-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  isLoading$;

  constructor() {}

  ngOnInit(): void {}
}
