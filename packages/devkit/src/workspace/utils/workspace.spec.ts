import { Tree } from '@angular-devkit/schematics';
import { createEmptyWorkspace } from "./testing-utils";
import { updateBuilderConfig, updateWorkspace } from "./workspace";
import { callRule } from "./testing";
import { readWorkspace } from "./ast-utils";

describe('workspace utils', () => {
  describe('updateBuilderOptions', () => {
    let tree: Tree;
    beforeEach(async () => {
      tree = Tree.empty();
      tree = createEmptyWorkspace(tree);
      tree = await callRule(
        updateWorkspace((workspace) => {
          workspace.projects.add({
            name: 'proj1',
            root: 'proj1',
            targets: {
              a: {
                builder: 'builder1',
                options: {
                  i: 0,
                },
                configurations: {
                  production: {
                    i: 1,
                  },
                },
              },
            },
          });
          workspace.projects.add({
            name: 'proj2',
            root: 'proj2',
            targets: {
              a: {
                builder: 'builder2',
                options: {
                  i: 0,
                },
                configurations: {
                  production: {
                    i: 1,
                  },
                },
              },
            },
          });
        }),
        tree
      );
    });

    it('should update options', async () => {
      const result = await callRule(
        updateBuilderConfig((options) => {
          options.i = 99;
          return options;
        }, 'builder1'),
        tree
      );
      expect(
        readWorkspace(result).projects.proj1.architect.a.options.i
      ).toEqual(99);
      expect(
        readWorkspace(result).projects.proj1.architect.a.configurations
          .production.i
      ).toEqual(99);
    });

    it('should not update options of other builders', async () => {
      const result = await callRule(
        updateBuilderConfig((options) => {
          options.i = 99;
          return options;
        }, 'builder1'),
        tree
      );
      expect(
        readWorkspace(result).projects.proj2.architect.a.options.i
      ).toEqual(0);
      expect(
        readWorkspace(result).projects.proj2.architect.a.configurations
          .production.i
      ).toEqual(1);
    });
  });
});
