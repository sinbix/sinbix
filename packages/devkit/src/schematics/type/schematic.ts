import {
  chain,
  Rule, SchematicContext, Tree,
} from "@angular-devkit/schematics";
import { TypeSchematicSchema } from './schema';
import { getSinbix } from "../../lib/sinbix";

export default function(options: TypeSchematicSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    throw new Error(JSON.stringify(getSinbix(host), null, 2));
    return chain([]);
  }
}
