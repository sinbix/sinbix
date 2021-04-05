import * as _ from 'lodash';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DepGraphQuery, DepGraphService } from '@sinbix/sinbix/ng/data-access';
import { graphData } from '@sinbix/sinbix/ng/utils/constants';

@Component({
  selector: 'feat-dep-graph',
  templateUrl: './dep-graph.component.html',
  styleUrls: ['./dep-graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DepGraphComponent implements OnInit {
  projects$ = this.graphQuery.selectAll();

  activedProjects$ = this.graphQuery.selectActive();

  dependencies$ = this.graphQuery.dependencies$;

  affected$ = this.graphQuery.affected$;

  focusedProject$ = this.graphQuery.focused$;

  constructor(
    private graphService: DepGraphService,
    private graphQuery: DepGraphQuery
  ) {}

  ngOnInit(): void {
    this.graphService.setGraph(graphData);
  }

  onFocus(project: string) {
    this.graphService.focus(project);
  }

  onExclude(project: string) {
    this.graphService.deactive(project);
  }
}
