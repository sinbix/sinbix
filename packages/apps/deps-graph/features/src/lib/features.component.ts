import { Component, ElementRef, OnInit } from '@angular/core';
import { mediumGraph, environment } from '@sinbix/apps/deps-graph/utils';
import { IGraphModel } from '@sinbix/apps/deps-graph/interfaces';
import { GraphQuery, GraphService } from '@sinbix/apps/deps-graph/data-access';
import * as _ from 'lodash';
import { ScreenQuery } from '@sinbix-angular/utils';

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

  focusedProject$ = this.graphQuery.focusedProject$;

  graph: IGraphModel = {
    projects: null,
    dependencies: null,
    affected: null,
    focusedProject: null,
    active: [],
    exclude: null,
  };

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery,
    private screenQuery: ScreenQuery,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    if (!environment.production) {
      this.demo();
    }
  }

  private demo() {
    const currentGraph = mediumGraph;
    const nodes = Object.values(currentGraph.nodes).filter(
      (node) => node.type !== 'npm'
    );

    this.graph.projects = nodes as any;
    this.graph.dependencies = currentGraph.dependencies as any;
    this.graph.affected = [];
    this.graph.exclude = [];
    this.graphService.setGraph(this.graph);
  }

  onFocus(project: string) {
    this.graphService.focus(project);
  }

  onExclude(project: string) {
    this.graphService.deselect(project);
  }
}
