import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'deps-graph-ui-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() projects: string[];

  constructor() {}

  ngOnInit(): void {}

  trackByFn(index, project) {
    return project;
  }
}
