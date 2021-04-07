import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-games-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
