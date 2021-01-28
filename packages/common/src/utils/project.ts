import { toFileName } from './name-utils';

export function normalizeProjectName(name: string) {
  return toFileName(name).replace(new RegExp('/', 'g'), '-');
}
