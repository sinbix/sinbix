import * as _ from 'lodash';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GraphQuery, GraphService } from '@sinbix/sinbix/dep-graph/data-access';
import { graphData } from '@sinbix/sinbix/dep-graph/utils';

@Component({
  selector: 'deps-graph-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeaturesComponent implements OnInit {
  projects$ = this.graphQuery.selectAll();

  activedProjects$ = this.graphQuery.selectActive();

  dependencies$ = this.graphQuery.dependencies$;

  affected$ = this.graphQuery.affected$;

  focusedProject$ = this.graphQuery.focused$;

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery
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
