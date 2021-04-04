export interface PackageBuilderOptions {
    /**
     * The file path for the ng-packagr configuration file, relative to the current workspace.
     */
    project: string;
    /**
     * The full path for the TypeScript configuration file, relative to the current workspace.
     */
    tsConfig?: string;
    /**
     * Run build when files change.
     */
    watch?: boolean;
    updateBuildableProjectDepsInPackageJson?: boolean;
    buildableProjectDepsInPackageJsonType?: 'dependencies' | 'peerDependencies';
}
