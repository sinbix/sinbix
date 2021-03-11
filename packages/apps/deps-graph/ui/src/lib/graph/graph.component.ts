import { default as tippy, hideAll } from 'tippy.js';
import { select, curveBasis, zoom, zoomIdentity } from 'd3';
import * as dagreD3 from 'dagre-d3';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as _ from 'lodash';
import { ProjectGraphDependency, ProjectGraphNode } from '@sinbix/core';

@Component({
  selector: 'deps-graph-ui-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() projects: ProjectGraphNode[];

  @Input() dependencies: ProjectGraphDependency[];

  @Input() activeProjects: ProjectGraphNode[];

  @Input() focusedProject: string;

  @Input() affected: string[];

  constructor(private _elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
    if (!this.activeProjects?.length) {
      document.getElementById('no-projects-chosen').style.display = 'flex';
    } else {
      document.getElementById('no-projects-chosen').style.display = 'none';
    }
  }

  ngOnInit(): void {}

  @HostListener('window:resize')
  windowResize() {
    this.render();
  }

  render() {
    hideAll();

    const g = this.generateLayout();
    const render = this.createRenderer();

    // Set up an SVG group so that we can translate the final graph.
    var svg = select('#svg-canvas');
    svg.select('g').remove();
    let inner = svg.append('g');

    // Set up zoom support
    var z = zoom().on('zoom', (event: any) => {
      if (event.transform.x === Number.POSITIVE_INFINITY) {
        event.transform.x = 0;
      }
      inner.attr('transform', event.transform);
    });

    svg.call(z);

    // Run the renderer. This is what draws the final graph.
    setTimeout(() => {
      render(inner, g);

      // Center the graph
      var initialScale = 0.75;

      svg.call(
        z.transform as any,
        zoomIdentity
          .translate(
            (+svg.attr('width') - g.graph().width * initialScale) / 2,
            20
          )
          .scale(initialScale)
      );

      const nativeElement = this._elRef.nativeElement;

      svg.attr('height', nativeElement.offsetHeight);
      svg.attr('width', nativeElement.offsetWidth);

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
        let directories = split.slice(1, -2);

        if (directories.length > 0) {
          let directory = directories.join('/');

          this.createDirectoryParents(g, directories);

          let directoryId = `dir-${directory}`;

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
    var render = new dagreD3.render();

    render.shapes().glowRect = (parent, bbox, node) => {
      const filter = node.class.includes('no-affected')
        ? 'sofGlowFocus'
        : 'sofGlowFocusAffected';
      var shapeSvg = parent
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

      var rx = bbox.width / 2;
      var ry = bbox.height / 2;
      var shapeSvg = parent
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

  addTooltips(inner) {
    const createTipTemplate = (project) => {
      return `
        <h4><span class="tag">${project.type}</span>${project.name}</h4>
        <p><strong>tags</strong><br> ${
          project.data.tags?.join('<br>') ?? ''
        }</p>
        <div class="flex">
          <button onclick="window.focusProject('${
            project.name
          }')">Focus</button>
          <button onclick="window.excludeProject('${
            project.name
          }')">Exclude</button>
        </div>
    `;
    };

    inner.selectAll('g.node').each((id) => {
      const project = this.projects.find((p) => p.name === id);
      // tippy(this.el.nativeElement, {
      //   content: createTipTemplate(project),
      //   allowHTML: true,
      //   interactive: true,
      //   appendTo: document.body,
      //   interactiveBorder: 10,
      //   trigger: 'click',
      // });
    });
  }

  createDirectoryParents(g, directories) {
    let childDirectory = directories.join('/');
    let childDirectoryId = `dir-${childDirectory}`;

    if (!g.hasNode(childDirectoryId)) {
      g.setNode(childDirectoryId, {
        label: childDirectory,
        clusterLabelPos: 'top',
      });
    }

    if (directories.length > 1) {
      let parentDirectory = directories.slice(0, -1).join('/');
      let parentDirectoryId = `dir-${parentDirectory}`;
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
}
