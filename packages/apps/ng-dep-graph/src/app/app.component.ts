import { default as tippy, hideAll } from 'tippy.js';
import { select, curveBasis, zoom, zoomIdentity } from 'd3';
import * as dagreD3 from 'dagre-d3';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { GraphModel, mediumGraph } from './utils';

@Component({
  selector: 'sinbix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  graph: GraphModel = {
    projects: null,
    graph: null,
    affected: null,
    focusedProject: null,
    filteredProjects: [],
    groupByFolder: null,
    exclude: null,
  };

  ngOnInit(): void {
    if (!environment.production) {
      this.demo();
    };

    this.main();
  }

  private demo() {
    const currentGraph = mediumGraph;

    const nodes = Object.values(currentGraph.nodes).filter(
      (node) => node.type !== 'npm'
    );

    this.graph.projects = nodes as any;
    this.graph.graph = currentGraph as any;
    this.graph.affected = [];
    this.graph.exclude = [];

    console.log(this.graph);
  }

  getProjectsByType(type) {
    return this.graph.projects.filter((project) => project.type === type);
  }
  
  groupProjectsByDirectory(projects) {
    let groups = {};
  
    projects.forEach((project) => {
      const split = project.data.root.split('/');
      const directory = split.slice(1, -1).join('/');
  
      if (!groups.hasOwnProperty(directory)) {
        groups[directory] = [];
      }
      groups[directory].push(project);
    });
  
    return groups;
  }
  
  createProjectList(headerText, projects) {
    const header = document.createElement('h5');
    header.textContent = headerText;
  
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
  
    let sortedProjects = [...projects];
    sortedProjects.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  
    projects.forEach((project) => {
      let formLine = document.createElement('div');
      formLine.className = 'form-line';
  
      let focusButton = document.createElement('button');
      focusButton.className = 'icon';
  
      let buttonIconContainer = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      let buttonIcon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
      );
  
      buttonIcon.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        '#crosshair'
      );
  
      buttonIconContainer.appendChild(buttonIcon);
  
      focusButton.append(buttonIconContainer);
  
      focusButton.onclick = () => {
        this.focusProject(project.name);
      };
  
      let label = document.createElement('label');
      label.className = 'form-checkbox';
  
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'projectName';
      checkbox.value = project.name;
      checkbox.checked = false;
  
      checkbox.addEventListener('change', this.filterProjects);
  
      const labelText = document.createTextNode(project.name);
  
      formLine.append(focusButton);
      formLine.append(label);
  
      label.append(checkbox);
      label.append(labelText);
  
      formGroup.append(formLine);
    });
  
    const projectsListContainer = document.getElementById('project-lists');
    projectsListContainer.append(header);
    projectsListContainer.append(formGroup);
  }
  
  addProjectCheckboxes() {
    const appProjects = this.getProjectsByType('app');
    const libProjects = this.getProjectsByType('lib');
    const e2eProjects = this.getProjectsByType('e2e');
    const npmProjects = this.getProjectsByType('npm');
  
    const libDirectoryGroups = this.groupProjectsByDirectory(libProjects);
  
    const projectsListContainer = document.getElementById('project-lists');
  
    const appsHeader = document.createElement('h4');
    appsHeader.textContent = 'app projects';
    projectsListContainer.append(appsHeader);
    this.createProjectList('apps', appProjects);
  
    const e2eHeader = document.createElement('h4');
    e2eHeader.textContent = 'e2e projects';
    projectsListContainer.append(e2eHeader);
    this.createProjectList('e2e', e2eProjects);
  
    const libHeader = document.createElement('h4');
    libHeader.textContent = 'lib projects';
    projectsListContainer.append(libHeader);
  
    const sortedDirectories = Object.keys(libDirectoryGroups).sort();
  
    sortedDirectories.forEach((directoryName) => {
      this.createProjectList(directoryName, libDirectoryGroups[directoryName]);
    });
  
    if (npmProjects.length > 0) {
      const npmHeader = document.createElement('h4');
      npmHeader.textContent = 'npm dependencies';
      projectsListContainer.append(npmHeader);
      this.createProjectList('npm', npmProjects);
    }
  }
  
  hasPath(target, node, visited) {
    if (target === node) return true;
  
    for (let d of this.graph.graph.dependencies[node] || []) {
      if (d) {
        if (visited.indexOf(d.target) > -1) continue;
        visited.push(d.target);
        if (this.hasPath(target, d.target, visited)) return true;
      }
    }
    return false;
  }
  
  getProjectCheckboxes(): HTMLInputElement[] {
    return Array.from(document.querySelectorAll('input[name=projectName]'));
  }
  
  checkForAffected() {
    const isAffected = this.graph.affected.length > 0;
  
    if (isAffected) {
      const selectedAffectedButton = document.getElementById(
        'select-affected-button'
      );
      selectedAffectedButton.classList.remove('hide');
  
      this.selectAffectedProjects();
    }
  }
  
  selectAffectedProjects() {
    this.graph.focusedProject = null;
    document.getElementById('focused-project').hidden = true;
    document.getElementById('focused-project-name').innerText = '';
  
    this.getProjectCheckboxes().forEach((checkbox) => {
      checkbox.checked = this.graph.affected.includes(checkbox.value);
    });
  
    this.filterProjects();
  }
  
  selectAllProjects() {
    this.graph.focusedProject = null;
    document.getElementById('focused-project').hidden = true;
    document.getElementById('focused-project-name').innerText = '';
  
    this.getProjectCheckboxes().forEach((checkbox) => {
      checkbox.checked = true;
    });
  
    this.filterProjects();
  }
  
  deselectAllProjects() {
    this.graph.focusedProject = null;
    document.getElementById('focused-project').hidden = true;
    document.getElementById('focused-project-name').innerText = '';
  
    this.getProjectCheckboxes().forEach((checkbox) => {
      checkbox.checked = false;
    });
  
    this.filterProjects();
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
  
  generateLayout() {
    const g = new dagreD3.graphlib.Graph({
      compound: true,
      orderRestarts: 10,
    });
  
    const groupByFolder = document.querySelector<HTMLInputElement>(
      'input[name=displayOptions][value=groupByFolder]'
    ).checked;
  
    g.setGraph({
      ranksep: 150,
      edgesep: 100,
    });
  
    g.setDefaultEdgeLabel(() => {
      return {};
    });
  
    this.graph.filteredProjects.forEach((p) => {
      const shape =
        p.name === this.graph.focusedProject
          ? p.type === 'app' || p.type === 'e2e'
            ? 'glowRect'
            : 'glowEllipse'
          : p.type === 'app' || p.type === 'e2e'
          ? 'rect'
          : 'ellipse';
  
      const clazz = this.graph.affected.includes(p.name) ? 'affected' : 'no-affected';
  
      g.setNode(p.name, { label: p.name, shape: shape, class: clazz });
  
      if (
        groupByFolder &&
        p.type == 'lib' &&
        p.data.hasOwnProperty('sourceRoot')
      ) {
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
  
    Object.keys(this.graph.graph.dependencies).forEach((p) => {
      const filteredProjectNames = this.graph.filteredProjects.map((f) => f.name);
      this.graph.graph.dependencies[p].forEach((d) => {
        if (
          filteredProjectNames.indexOf(p) > -1 &&
          filteredProjectNames.indexOf(d.target) > -1
        ) {
          let clazz =
            this.graph.affected.indexOf(p) > -1 &&
            this.graph.affected.indexOf(d.target) > -1
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
  
      const mainContent = document.getElementById('main-content');
  
      svg.call(
        z.transform as any,
        zoomIdentity
          .translate(
            (+svg.attr('width') - g.graph().width * initialScale) / 2,
            20
          )
          .scale(initialScale)
      );
  
      svg.attr('height', mainContent.offsetHeight);
      svg.attr('width', mainContent.offsetWidth);
  
      this.addTooltips(inner);
    });
  }
  
  addTooltips(inner) {
    const createTipTemplate = (project) => {
      return `
        <h4><span class="tag">${project.type}</span>${project.name}</h4>
        <p><strong>tags</strong><br> ${project.data.tags?.join('<br>') ?? ''}</p>
        <div class="flex">
          <button onclick="window.focusProject('${project.name}')">Focus</button>
          <button onclick="window.excludeProject('${
            project.name
          }')">Exclude</button>
        </div>
    `;
    };
  
    inner.selectAll('g.node').each((id) => {
      const project = this.graph.projects.find((p) => p.name === id);
      // tippy(this, {
      //   content: createTipTemplate(project),
      //   allowHTML: true,
      //   interactive: true,
      //   appendTo: document.body,
      //   interactiveBorder: 10,
      //   trigger: 'click',
      // });
    });
  }
  
  focusProject(id, doFilter = true) {
    this.graph.focusedProject = id;
  
    document.getElementById('focused-project').hidden = false;
    document.getElementById('focused-project-name').innerText = id;
  
    Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    ).forEach((checkbox) => {
      const showProject =
        this.hasPath(id, checkbox.value, []) || this.hasPath(checkbox.value, id, []);
      checkbox.checked = showProject;
      checkbox.parentElement.hidden = !showProject;
    });
  
    if (doFilter) {
      this.filterProjects();
    }
  }
  
  unfocusProject() {
    this.graph.focusedProject = null;
    document.getElementById('focused-project').hidden = true;
    document.getElementById('focused-project-name').innerText = '';
  
    Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    ).forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.parentElement.hidden = false;
    });
  
    this.filterProjects();
  }
  
  excludeProject(id, doFilter = true) {
    document.querySelector<HTMLInputElement>(
      `input[name=projectName][value=${id}]`
    ).checked = false;
  
    if (doFilter) {
      this.filterProjects();
    }
  }
  
  filterProjects() {
    const checkboxes = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    );
  
    const selectedProjects = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  
    const unselectedProjects = checkboxes
      .filter((checkbox) => !checkbox.checked)
      .map((checkbox) => checkbox.value);
  
    if (selectedProjects.length === this.graph.projects.length) {
      this.graph.filteredProjects = this.graph.projects;
    } else {
      this.graph.filteredProjects = this.graph.projects.filter((p) => {
        const filtered = selectedProjects.find(
          (f) => this.hasPath(f, p.name, []) || this.hasPath(p.name, f, [])
        );
  
        return unselectedProjects.indexOf(p.name) === -1 && filtered;
      });
    }
  
    if (this.graph.filteredProjects.length === 0) {
      document.getElementById('no-projects-chosen').style.display = 'flex';
    } else {
      document.getElementById('no-projects-chosen').style.display = 'none';
    }
    this.render();
  }
  
  listenForTextFilterChanges() {
    const textFilterInput = document.getElementById(
      'textFilterInput'
    ) as HTMLInputElement;
    const textFilterButton = document.getElementById('textFilterButton');
  
    textFilterButton.addEventListener('click', () => {
      this.filterProjectsByText(textFilterInput.value.toLowerCase());
    });
  
    textFilterInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.filterProjectsByText(textFilterInput.value.toLowerCase());
      }
    });
  }
  
  filterProjectsByText(text) {
    const checkboxes = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    );
  
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  
    const split = text.split(',').map((splitItem) => splitItem.trim());
  
    const matchedProjects = checkboxes
      .map((checkbox) => checkbox.value)
      .filter(
        (project) =>
          split.findIndex((splitItem) => project.includes(splitItem)) > -1
      );
  
    const includeInPath = document.querySelector<HTMLInputElement>(
      'input[name=textFilterCheckbox]'
    ).checked;
  
    matchedProjects.forEach((project) => {
      checkboxes.forEach((checkbox) => {
        if (
          checkbox.value === project ||
          (includeInPath &&
            (this.hasPath(project, checkbox.value, []) ||
              this.hasPath(checkbox.value, project, [])))
        ) {
          checkbox.checked = true;
        }
      });
    });
  
    this.filterProjects();
  }
  
  main() {
    this.addProjectCheckboxes();
    this.checkForAffected();
  
    document
      .querySelector('input[name=displayOptions][value=groupByFolder]')
      .addEventListener('change', () => this.filterProjects());

      // this.addEventListener('resize', () => render());
  
    if (this.graph.groupByFolder) {
      document.querySelector<HTMLInputElement>(
        'input[name=displayOptions][value=groupByFolder]'
      ).checked = true;
    }
  
    if (this.graph.focusedProject !== null) {
      this.focusProject(this.graph.focusedProject, false);
    }
  
    if (this.graph.exclude.length > 0) {
      this.graph.exclude.forEach((project) => this.excludeProject(project, false));
    }
  
    this.listenForTextFilterChanges();
  
    this.filterProjects();
  }  
}
