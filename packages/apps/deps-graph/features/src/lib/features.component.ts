import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { mediumGraph, environment } from '@sinbix/apps/deps-graph/utils';
import { IGraphModel } from '@sinbix/apps/deps-graph/interfaces';
import { GraphQuery, GraphService } from '@sinbix/apps/deps-graph/data-access';

@Component({
  selector: 'deps-graph-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  projects$ = this.graphQuery.selectAll();

  activedProjects$ = this.graphQuery.selectActive();

  dependencies$ = this.graphQuery.dependencies$;

  affected$ = this.graphQuery.affected$;

  focusedProject$ = this.graphQuery.focused$;

  graph: IGraphModel = {
    projects: null,
    dependencies: null,
    affected: null,
    focused: null,
    active: [],
    exclude: null,
  };

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery
  ) {}

  ngOnInit(): void {
    // if (!environment.production) {
      this.demo();
    // }

    this.graphService.focus(this.graph.focused);
    this.graphService.activeAffected();
    this.graphService.deactive(...this.graph.exclude);
  }

  private demo() {
    const currentGraph = mediumGraph;
    const nodes = Object.values(currentGraph.nodes).filter(
      (node) => node.type !== 'npm'
    );

    this.graph.projects = nodes as any;
    this.graph.dependencies = currentGraph.dependencies as any;
    this.graph.focused = 'apps-nest-app';
    this.graph.affected = ['apps-nest-app', 'apps-nest-app-ui-common'];
    this.graph.exclude = ['apps-nest-app'];
    this.graphService.setGraph(this.graph);
  }

  onFocus(project: string) {
    this.graphService.focus(project);
  }

  onExclude(project: string) {
    this.graphService.deactive(project);
  }
}
