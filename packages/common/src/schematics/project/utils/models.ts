import { ProjectType } from '../../../utils';

export interface ProjectSchematicOptions {
  name: string;
  directory?: string;
  type?: ProjectType;
  tags?: string;
  sourceRoot?: string;
}

export interface NormalizedOptions extends ProjectSchematicOptions {
  projectName: string;
  projectRoot: string;
  projectTags: string[];
}
