import { ProjectSchematicSchema } from './schema';

interface NormalizedSchema extends ProjectSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
