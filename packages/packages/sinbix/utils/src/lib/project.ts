import { toFileName } from './name-utils';
import { getProjectConfig } from './ast-utils';
import { Tree } from '@angular-devkit/schematics';
import { join, sep } from 'path';

export function normalizeProjectName(name: string) {
  return toFileName(name).replace(new RegExp('/', 'g'), '-');
}

export interface ProjectOptions {
  name: string;
  directory?: string;
  tags?: string;
}

export interface NormalizedProjectOptions {
  projectName: string;
  projectRoot: string;
  projectTags: string[];
}

export function normalizeProject(
  options: ProjectOptions
): NormalizedProjectOptions {
  const name = options.name;

  const projectRoot = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;

  const projectName = normalizeProjectName(projectRoot);

  const projectTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    projectName,
    projectRoot,
    projectTags,
  };
}

export interface NormalizedProjectConfigOptions {
  projectConfig: any;
}

export function normalizeProjectConfig(
  host: Tree,
  project: string
): NormalizedProjectConfigOptions {
  const projectConfig = getProjectConfig(host, project);
  return {
    projectConfig,
  };
}

export function getDestination(path: string): string {
  return join(path).split(sep).join('/');
}

export function getNewProjectName(path: string): string {
  return path.replace(/\//g, '-');
}

export function normalizeSlashes(input: string): string {
  return input
    .split('/')
    .filter((x) => !!x)
    .join('/');
}
