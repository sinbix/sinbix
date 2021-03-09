import { EntityState, MultiActiveState } from '@datorama/akita';
import { ProjectGraphNode } from '@sinbix/core';

export interface ProjectsState
  extends EntityState<ProjectGraphNode>,
    MultiActiveState {}
