import { IGraphModel } from '../../interfaces';
import { graphMocks } from './graph-mocks';

const currentGraph = graphMocks;
const nodes = Object.values(currentGraph.nodes).filter(
  (node) => node.type !== 'npm'
);

export const graphData: IGraphModel = {
  projects: nodes as any,
  dependencies: currentGraph.dependencies as any,
  focused: 'apps-nest-app',
  affected: ['apps-nest-app', 'apps-nest-app-ui-common'],
  exclude: ['apps-nest-app'],
  active: [],
};
