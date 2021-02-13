import { main } from './dep-graph/dep-graph';
import { mediumGraph } from './graphs/medium';

const currentGraph = mediumGraph;

const nodes = Object.values(currentGraph.nodes).filter(
  (node) => node.type !== 'npm'
);

window.projects = nodes as any;
window.graph = currentGraph as any;
window.affected = [];
window.exclude = [];

setTimeout(() => main());
