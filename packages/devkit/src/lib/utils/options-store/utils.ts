import * as _ from 'lodash';
import {
  chain, externalSchematic,
  Rule,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";
import { StoreKeyOption } from './types';

export function schematicRule(collection: string, schematic: string, options: object): Rule {
  const rule = externalSchematic(collection, schematic, options);
  // throw new Error('schematicRule')
  return rule;
}

export class Ruler {
  constructor(context: SchematicContext) {
    const description = context.schematic.description;
    const schematic = `${description.collection.name}:${description.name}`;
  }

  rule(rules: Rule[]): Rule {
    return chain(rules);
  }
}

export class OptionsStore {
  private static store = {};

  static getOptions<T extends StoreKeyOption, K>(
    options: T,
    parser: { (options: T): K }
  ): K {
    let resultOpts = _.get(this.store, options.storeKey);
    if (!resultOpts) {
      resultOpts = parser(options);
      this.store = _.set(this.store, options.storeKey, resultOpts);
    }
    return resultOpts;
  }
}

const test = [
  {
    superMultiProject: [
      {
        multiProjects: [
          {
            project: {
              name: 'project-name',
              tags: 'tags',
            },
          },
          {
            project: {
              name: 'project-name',
              tags: 'qwe',
            },
          },
        ],
      },
      {
        multiProjects: [
          {
            multiProjects: []
          }
        ],
      },
    ],
  },
];
