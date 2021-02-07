import { join } from 'path';
import { mocked } from 'ts-jest/utils';
jest.mock('@sinbix/core/src/project-graph');
import * as projectGraph from '@sinbix/core/src/project-graph';



jest.mock('glob');
import * as glob from 'glob';
jest.mock('fs-extra');
import * as fs from 'fs-extra';
jest.mock('@sinbix/core/src/utils/fileutils');
import * as fsUtility from '@sinbix/core/src/utils/fileutils';
import * as tsUtils from '@sinbix/core/src/utils/typescript';
import * as ts from 'typescript';
import { getMockContext, MockBuilderContext, ProjectType } from "@sinbix/utils";
import { PackageBuilderOptions } from "./utils";
import { ProjectGraph } from "@sinbix/core";
import { runBuilder } from "./builder";

describe('NodePackageBuilder', () => {
  let testOptions: PackageBuilderOptions;
  let context: MockBuilderContext;

  beforeEach(async () => {
    mocked(fsUtility.readJsonFile).mockImplementation(
      (path: string): unknown => {
        if (path.endsWith('tsconfig.lib.json')) {
          return {
            extends: './tsconfig.json',
            compilerOptions: {
              outDir: '../../dist/out-tsc',
              declaration: true,
              rootDir: './src',
              types: ['node'],
            },
            exclude: ['**/*.spec.ts'],
            include: ['**/*.ts'],
          };
        } else {
          return {
            name: 'nodelib',
          };
        }
      }
    );
    mocked(fsUtility.writeJsonFile).mockImplementation(
      (_: string, _2: unknown) => {
        //empty
        return;
      }
    );
    context = await getMockContext();
    context.target.target = 'build';
    context.target.project = 'nodelib';
    testOptions = {
      assets: [],
      main: 'libs/nodelib/src/index.ts',
      outputPath: 'dist/libs/nodelib',
      packageJson: 'libs/nodelib/package.json',
      tsConfig: 'libs/nodelib/tsconfig.lib.json',
      watch: false,
      sourceMap: false,
    };
  });

  describe('Without library dependencies', () => {
    beforeEach(() => {
      spyOn(projectGraph, 'createProjectGraph').and.callFake(() => {
        return {
          nodes: {
            nodelib: {
              type: ProjectType.Library,
              name: 'nodelib',
              data: {
                files: [],
                root: 'libs/nodelib',
                architect: { build: { builder: 'any builder' } },
              },
            },
            'nodelib-child': {
              type: ProjectType.Library,
              name: 'nodelib-child',
              data: {
                files: [],
                root: 'libs/nodelib-child',
                prefix: 'proj',
                architect: {
                  build: {
                    builder: 'any builder',
                    options: {
                      assets: [],
                      main: 'libs/nodelib-child/src/index.ts',
                      outputPath: 'dist/libs/nodelib-child',
                      packageJson: 'libs/nodelib-child/package.json',
                      tsConfig: 'libs/nodelib-child/tsconfig.lib.json',
                    },
                  },
                },
              },
            },
          },
          dependencies: {
            nodelib: [],
            'nodelib-child': [],
          },
        } as ProjectGraph;
      });
    });

    it('should update the package.json after compiling typescript', (done) => {
      runBuilder(testOptions, context).subscribe({
        complete: () => {
          expect(fsUtility.writeJsonFile).toHaveBeenCalledWith(
            `${testOptions.outputPath}/package.json`,
            {
              name: 'nodelib',
              main: 'src/index.js',
              typings: 'src/index.d.ts',
            }
          );
          done();
        },
      });
    });

    it('should have the output path in the BuilderOutput', (done) => {
      runBuilder(testOptions, context).subscribe({
        next: (value) => {
          expect(value.outputPath).toEqual(testOptions.outputPath);
        },
        complete: () => {
          done();
        },
      });
    });

    describe('Asset copying', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should be able to copy assets using the glob object', (done) => {
        mocked(glob.sync).mockReturnValue(['logo.png']);
        runBuilder(
          {
            ...testOptions,
            assets: [
              {
                glob: '**.*',
                input: 'lib/nodelib/src/assets',
                output: './newfolder',
                ignore: [],
              },
            ],
          },
          context
        ).subscribe({
          complete: () => {
            expect(fs.copy).toHaveBeenCalledTimes(1);
            expect(fs.copy).toHaveBeenCalledWith(
              `${context.workspaceRoot}/lib/nodelib/src/assets/logo.png`,
              `${context.workspaceRoot}/${testOptions.outputPath}/newfolder/logo.png`
            );

            done();
          },
        });
      });
      it('should be able to copy assets with a regular string', (done) => {
        mocked(glob.sync).mockReturnValue(['lib/nodelib/src/LICENSE']);

        runBuilder(
          {
            ...testOptions,
            assets: ['lib/nodelib/src/LICENSE'],
          },
          context
        ).subscribe({
          complete: () => {
            expect(fs.copy).toHaveBeenCalledTimes(1);
            expect(fs.copy).toHaveBeenCalledWith(
              `${context.workspaceRoot}/lib/nodelib/src/LICENSE`,
              `${context.workspaceRoot}/${testOptions.outputPath}/LICENSE`
            );
            done();
          },
        });
      });

      it('should be able to copy assets with a glob string', (done) => {
        mocked(glob.sync).mockReturnValue([
          'lib/nodelib/src/README.md',
          'lib/nodelib/src/CONTRIBUTING.md',
        ]);
        runBuilder(
          {
            ...testOptions,
            assets: ['lib/nodelib/src/*.MD'],
          },
          context
        ).subscribe({
          complete: () => {
            expect(fs.copy).toHaveBeenCalledTimes(2);
            expect(fs.copy).toHaveBeenCalledWith(
              `${context.workspaceRoot}/lib/nodelib/src/README.md`,
              `${context.workspaceRoot}/${testOptions.outputPath}/README.md`
            );
            expect(fs.copy).toHaveBeenCalledWith(
              `${context.workspaceRoot}/lib/nodelib/src/CONTRIBUTING.md`,
              `${context.workspaceRoot}/${testOptions.outputPath}/CONTRIBUTING.md`
            );
            done();
          },
        });
      });
    });

    describe('srcRootForCompilationRoot', () => {
      let spy: jest.SpyInstance;
      beforeEach(() => {
        jest.clearAllMocks();
        spy = jest.spyOn(ts, 'createCompilerHost');
      });

      it('should use srcRootForCompilationRoot when it is defined', (done) => {
        testOptions.srcRootForCompilationRoot = 'libs/nodelib/src';

        runBuilder(testOptions, context).subscribe({
          complete: () => {
            expect(spy).toHaveBeenCalledWith(
              expect.objectContaining({
                rootDir: 'libs/nodelib/src',
              })
            );
            done();
          },
        });
      });
      it('should not use srcRootForCompilationRoot when it is not defined', (done) => {
        testOptions.srcRootForCompilationRoot = undefined;

        runBuilder(testOptions, context).subscribe({
          complete: () => {
            expect(spy).toHaveBeenCalledWith(
              expect.objectContaining({
                rootDir: 'libs/nodelib',
              })
            );
            done();
          },
        });
      });
    });
  });

  describe('building with dependencies', () => {
    beforeEach(() => {
      // fake that dep project has been built
      spyOn(projectGraph, 'createProjectGraph').and.callFake(() => {
        return {
          nodes: {
            nodelib: {
              type: ProjectType.Library,
              name: 'nodelib',
              data: {
                files: [],
                root: 'libs/nodelib',
                architect: { build: { builder: 'any builder' } },
              },
            },
            'nodelib-child': {
              type: ProjectType.Library,
              name: 'nodelib-child',
              data: {
                files: [],
                root: 'libs/nodelib-child',
                prefix: 'proj',
                architect: {
                  build: {
                    builder: 'any builder',
                    options: {
                      assets: [],
                      main: 'libs/nodelib-child/src/index.ts',
                      outputPath: 'dist/libs/nodelib-child',
                      packageJson: 'libs/nodelib-child/package.json',
                      tsConfig: 'libs/nodelib-child/tsconfig.lib.json',
                    },
                  },
                },
              },
            },
          },
          dependencies: {
            nodelib: [
              {
                type: ProjectType.Library,
                target: 'nodelib-child',
                source: null,
              },
            ],
            'nodelib-child': [],
          },
        } as ProjectGraph;
      });
      // dist/libs/nodelib-child/package.json
      mocked(fsUtility.fileExists).mockImplementation((arg: string) => {
        return arg.endsWith('dist/libs/nodelib-child/package.json');
      });
    });

    it('should call the tsc compiler with the modified tsconfig.json', (done) => {
      const tmpTsConfigPath = join(
        '/root',
        'tmp',
        'libs/nodelib',
        'tsconfig.generated.json'
      );

      const tsConfigSpy = jest.spyOn(tsUtils, 'readTsConfig');

      runBuilder(testOptions, context).subscribe({
        complete: () => {
          expect(tsConfigSpy).toHaveBeenCalledWith(tmpTsConfigPath);
          done();
        },
      });
    });
  });
});
