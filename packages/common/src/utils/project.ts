import { toFileName } from './name-utils';

export function normalizeProjectName(name: string) {
  return toFileName(name).replace(new RegExp('/', 'g'), '-');
}

export interface ProjectOptions {
  name: string;
  directory?: string;
  tags?: string;
}

export interface NormalizedProjectOptions extends ProjectOptions {
  projectName: string;
  projectRoot: string;
  projectTags: string[];
}

export function normalizeProject(
  options: ProjectOptions
): NormalizedProjectOptions {
  const name = options.name;

  const projectName = normalizeProjectName(name);

  const projectRoot = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;

  const projectTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectTags,
  };
}
