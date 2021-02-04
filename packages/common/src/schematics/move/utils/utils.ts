import { NormalizedOptions } from './models';
import { join, sep } from 'path';

export function getDestination(options: NormalizedOptions): string {
  return join(options.destination).split(sep).join('/');
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
