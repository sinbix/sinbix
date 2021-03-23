import { default as tippy, hideAll } from 'tippy.js';
import { select, curveBasis, zoom, zoomIdentity } from 'd3';
import * as dagreD3 from 'dagre-d3';
import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as _ from 'lodash';
import { ProjectGraphDependency, ProjectGraphNode } from '@sinbix/core';
import {
  CdkConnectedOverlay,
  Overlay,
  OverlayOutsideClickDispatcher,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TooltipComponent } from './tooltip';
import { ComponentPortal } from '@angular/cdk/portal';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'deps-graph-ui-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() projects: ProjectGraphNode[];

  @Input() dependencies: ProjectGraphDependency[];

  @Input() activeProjects: ProjectGraphNode[];

  @Input() focusedProject: string;

  @Input() affected: string[];

  @Output() focusEvent: EventEmitter<string> = new EventEmitter();

  @Output() excludeEvent: EventEmitter<string> = new EventEmitter();

  private overlayRef: OverlayRef;

  constructor(
    private _elRef: ElementRef,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private overlayC: OverlayOutsideClickDispatcher
  ) {}

  ngOnChanges(): void {
    this.render();
  }

  ngOnInit(): void {}

  @HostListener('window:resize')
  windowResize() {
    this.render();
  }

  @Debounce(100)
  render() {
    this.closeTooltip();

    hideAll();

    const g = this.generateLayout();
    const render = this.createRenderer();

    // Set up an SVG group so that we can translate the final graph.
    const svg = select('#graph-canvas');
    svg.select('g').remove();
    const inner = svg.append('g');

    // Set up zoom support
    const z = zoom().on('zoom', (event: any) => {
      this.closeTooltip();
      if (event.transform.x === Number.POSITIVE_INFINITY) {
        event.transform.x = 0;
      }
      inner.attr('transform', event.transform);
    });

    svg.call(z);

    // Run the renderer. This is what draws the final graph.
    setTimeout(() => {
      render(inner, g);

      const nativeElement = this._elRef.nativeElement;

      svg.attr('height', nativeElement.offsetHeight);
      svg.attr('width', nativeElement.offsetWidth);

      // Center the graph
      const initialScale = 0.75;

      svg.call(
        z.transform as any,
        zoomIdentity
          .translate(
            (+svg.attr('width') - g.graph().width * initialScale) / 2,
            20
          )
          .scale(initialScale)
      );

      this.addTooltips(inner);
    });
  }

  generateLayout() {
    const g = new dagreD3.graphlib.Graph({
      compound: true,
      orderRestarts: 10,
    });

    g.setGraph({
      ranksep: 150,
      edgesep: 100,
    });

    g.setDefaultEdgeLabel(() => {
      return {};
    });

    this.activeProjects.forEach((p) => {
      const shape =
        p.name === this.focusedProject
          ? p.type === 'app' || p.type === 'e2e'
            ? 'glowRect'
            : 'glowEllipse'
          : p.type === 'app' || p.type === 'e2e'
          ? 'rect'
          : 'ellipse';

      const clazz = this.affected.includes(p.name) ? 'affected' : 'no-affected';

      g.setNode(p.name, { label: p.name, shape: shape, class: clazz });

      if (p.type == 'lib' && p.data.hasOwnProperty('sourceRoot')) {
        const split = p.data.sourceRoot.split('/');
        const directories = split.slice(1, -2);

        if (directories.length > 0) {
          const directory = directories.join('/');

          this.createDirectoryParents(g, directories);

          const directoryId = `dir-${directory}`;

          g.setParent(p.name, directoryId);
        }
      }
    });

    Object.keys(this.dependencies).forEach((p) => {
      const activeProjectNames = this.activeProjects.map((f) => f.name);
      this.dependencies[p].forEach((d) => {
        if (
          activeProjectNames.indexOf(p) > -1 &&
          activeProjectNames.indexOf(d.target) > -1
        ) {
          let clazz =
            this.affected.indexOf(p) > -1 &&
            this.affected.indexOf(d.target) > -1
              ? 'affected'
              : 'no-affected';
          if (d.type === 'dynamic') {
            clazz += ' lazy';
          }

          const label = d.type === 'implicit' ? 'implicit' : undefined;

          g.setEdge(p, d.target, {
            label: label,
            class: clazz,
            curve: curveBasis,
          });
        }
      });
    });

    return g;
  }

  createRenderer() {
    const render = new dagreD3.render();

    render.shapes().glowRect = (parent, bbox, node) => {
      const filter = node.class.includes('no-affected')
        ? 'sofGlowFocus'
        : 'sofGlowFocusAffected';

      const shapeSvg = parent
        .insert('rect', ':first-child')
        .attr('x', -bbox.width / 2)
        .attr('y', -bbox.height / 2)
        .attr('width', bbox.width)
        .attr('height', bbox.height)
        .attr('filter', `url(#${filter})`);

      node.intersect = (point) => {
        return dagreD3.intersect.rect(node, point);
      };

      return shapeSvg;
    };

    render.shapes().glowEllipse = (parent, bbox, node) => {
      const filter = node.class.includes('no-affected')
        ? 'sofGlowFocus'
        : 'sofGlowFocusAffected';

      const rx = bbox.width / 2;
      const ry = bbox.height / 2;
      const shapeSvg = parent
        .insert('ellipse', ':first-child')
        .attr('x', -bbox.width / 2)
        .attr('y', -bbox.height / 2)
        .attr('rx', rx)
        .attr('ry', ry)
        .attr('filter', `url(#${filter})`);

      node.intersect = (point) => {
        return dagreD3.intersect.ellipse(node, rx, ry, point);
      };

      return shapeSvg;
    };

    return render;
  }

  @ViewChild('htmlTemplate') htmlTemplate: CdkConnectedOverlay;

  addTooltips(inner) {
    inner.selectAll('g.node').on('click', (event, id: string) => {
      this.closeTooltip();

      const project = this.projects.find((p) => p.name === id);

      let target;

      inner.selectAll('g.node').each(function (d) {
        if (id === d) {
          target = this;
        }
      });

      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -8,
          },
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 8,
          },
        ]);

      this.overlayRef = this.overlay.create({ positionStrategy });

      this.overlayRef.outsidePointerEvents().subscribe((events) => {
        this.closeTooltip();
      });

      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
        new ComponentPortal(TooltipComponent)
      );

      this.overlayC.add(this.overlayRef);

      tooltipRef.instance.project = project;

      tooltipRef.instance.focusEvent.subscribe((project) => {
        this.focusEvent.emit(project);
        this.closeTooltip();
      });

      tooltipRef.instance.excludeEvent.subscribe((project) => {
        this.excludeEvent.emit(project);
        this.closeTooltip();
      });
    });
  }

  createDirectoryParents(g, directories) {
    const childDirectory = directories.join('/');
    const childDirectoryId = `dir-${childDirectory}`;

    if (!g.hasNode(childDirectoryId)) {
      g.setNode(childDirectoryId, {
        label: childDirectory,
        clusterLabelPos: 'top',
      });
    }

    if (directories.length > 1) {
      const parentDirectory = directories.slice(0, -1).join('/');
      const parentDirectoryId = `dir-${parentDirectory}`;
      if (!g.hasNode(parentDirectoryId)) {
        g.setNode(parentDirectoryId, {
          label: parentDirectory,
          clusterLabelPos: 'top',
        });
      }
      g.setParent(childDirectoryId, parentDirectoryId);

      this.createDirectoryParents(g, directories.slice(0, -1));
    }
  }

  private closeTooltip() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
