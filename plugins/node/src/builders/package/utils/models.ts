import { FileInputOutput } from '../../../utils';

export interface PackageBuilderOptions {
  main: string;
  tsConfig: string;
  outputPath: string;
  watch: boolean;
  sourceMap: boolean;
  assets: Array<AssetGlob | string>;
  packageJson: string;
  updateBuildableProjectDepsInPackageJson?: boolean;
  buildableProjectDepsInPackageJsonType?: 'dependencies' | 'peerDependencies';
  srcRootForCompilationRoot?: string;
}

export interface NormalizedBuilderOptions extends PackageBuilderOptions {
  files: Array<FileInputOutput>;
  normalizedOutputPath: string;
  relativeMainFileOutput: string;
}

export type AssetGlob = FileInputOutput & {
  glob: string;
  ignore: string[];
};
