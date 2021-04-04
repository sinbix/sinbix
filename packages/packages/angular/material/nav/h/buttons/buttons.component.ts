import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SxScreenQuery } from '@sinbix-angular/utils/screen';
import { NavItem } from '@sinbix-common/utils';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'smat-nav-h-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavHButtonsComponent implements OnInit {
  @Input() items: NavItem[];
  @Input() activeParent: string;
  @Input() activeChild: string | string[];

  width$ = this.screenQuery.select('width');

  close$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  );

  constructor(private screenQuery: SxScreenQuery, private router: Router) {}

  ngOnInit(): void {}
}
