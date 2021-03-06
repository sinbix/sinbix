"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = exports.parseMigrationsOptions = exports.Migrator = exports.normalizeVersion = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const workflow_1 = require("@angular-devkit/schematics/src/workflow");
const node_2 = require("@angular-devkit/schematics/tasks/node");
const options_1 = require("@angular-devkit/schematics/tasks/package-manager/options");
const tools_1 = require("@angular-devkit/schematics/tools");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const minimist = require("minimist");
const path_1 = require("path");
const semver_1 = require("semver");
const stripJsonComments = require("strip-json-comments");
const tmp_1 = require("tmp");
const utils_1 = require("../utils");
function normalizeVersion(version) {
    const [v, t] = version.split('-');
    const [major, minor, patch] = v.split('.');
    const newV = `${major || 0}.${minor || 0}.${patch || 0}`;
    const newVersion = t ? `${newV}-${t}` : newV;
    try {
        semver_1.gt(newVersion, '0.0.0');
        return newVersion;
    }
    catch (e) {
        try {
            semver_1.gt(newV, '0.0.0');
            return newV;
        }
        catch (e) {
            const withoutPatch = `${major || 0}.${minor || 0}.0`;
            try {
                if (semver_1.gt(withoutPatch, '0.0.0')) {
                    return withoutPatch;
                }
            }
            catch (e) {
                const withoutPatchAndMinor = `${major || 0}.0.0`;
                try {
                    if (semver_1.gt(withoutPatchAndMinor, '0.0.0')) {
                        return withoutPatchAndMinor;
                    }
                }
                catch (e) {
                    return '0.0.0';
                }
            }
        }
    }
}
exports.normalizeVersion = normalizeVersion;
class Migrator {
    constructor(opts) {
        this.versions = opts.versions;
        this.fetch = opts.fetch;
        this.from = opts.from;
        this.to = opts.to;
    }
    updatePackageJson(targetPackage, targetVersion) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const packageJson = yield this._updatePackageJson(targetPackage, { version: targetVersion, alwaysAddToPackageJson: false }, {});
            const migrations = yield this._createMigrateJson(packageJson);
            return { packageJson, migrations };
        });
    }
    _createMigrateJson(versions) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const migrations = yield Promise.all(Object.keys(versions).map((c) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const currentVersion = this.versions(c);
                if (currentVersion === null)
                    return [];
                const target = versions[c];
                const migrationsJson = yield this.fetch(c, target.version);
                if (!migrationsJson.schematics)
                    return [];
                return Object.keys(migrationsJson.schematics)
                    .filter((r) => this.gt(migrationsJson.schematics[r].version, currentVersion) &
                    this.lte(migrationsJson.schematics[r].version, target.version))
                    .map((r) => (Object.assign(Object.assign({}, migrationsJson.schematics[r]), { package: c, name: r })));
            })));
            return migrations.reduce((m, c) => [...m, ...c], []);
        });
    }
    _updatePackageJson(targetPackage, target, collectedVersions) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let targetVersion = target.version;
            if (this.to[targetPackage]) {
                targetVersion = this.to[targetPackage];
            }
            if (!this.versions(targetPackage)) {
                return {
                    [targetPackage]: {
                        version: target.version,
                        alwaysAddToPackageJson: !!target.alwaysAddToPackageJson,
                    },
                };
            }
            let migrationsJson;
            try {
                migrationsJson = yield this.fetch(targetPackage, targetVersion);
                targetVersion = migrationsJson.version;
            }
            catch (e) {
                if (e.message.indexOf('No matching version') > -1) {
                    throw new Error(`${e.message}\nRun migrate with --to="package1@version1,package2@version2"`);
                }
                else {
                    throw e;
                }
            }
            const packages = this.collapsePackages(targetPackage, targetVersion, migrationsJson);
            const childCalls = yield Promise.all(Object.keys(packages)
                .filter((r) => {
                return (!collectedVersions[r] ||
                    this.gt(packages[r].version, collectedVersions[r].version));
            })
                .map((u) => this._updatePackageJson(u, packages[u], Object.assign(Object.assign({}, collectedVersions), { [targetPackage]: target }))));
            return childCalls.reduce((m, c) => {
                Object.keys(c).forEach((r) => {
                    if (!m[r] || this.gt(c[r].version, m[r].version)) {
                        m[r] = c[r];
                    }
                });
                return m;
            }, {
                [targetPackage]: {
                    version: migrationsJson.version,
                    alwaysAddToPackageJson: target.alwaysAddToPackageJson || false,
                },
            });
        });
    }
    collapsePackages(packageName, targetVersion, m) {
        // this should be used to know what version to include
        // we should use from everywhere we use versions
        if (packageName === '@sinbix/core') {
            if (!m.packageJsonUpdates)
                m.packageJsonUpdates = {};
            m.packageJsonUpdates[targetVersion + '-defaultPackages'] = {
                version: targetVersion,
                packages: ['@sinbix/core'].reduce((m, c) => (Object.assign(Object.assign({}, m), { [c]: {
                        version: targetVersion,
                        alwaysAddToPackageJson: false,
                    } })), {}),
            };
        }
        if (!m.packageJsonUpdates || !this.versions(packageName))
            return {};
        return Object.keys(m.packageJsonUpdates)
            .filter((r) => {
            return (this.gt(m.packageJsonUpdates[r].version, this.versions(packageName)) && this.lte(m.packageJsonUpdates[r].version, targetVersion));
        })
            .map((r) => m.packageJsonUpdates[r].packages)
            .map((packages) => {
            if (!packages)
                return {};
            return Object.keys(packages)
                .filter((p) => !packages[p].ifPackageInstalled ||
                this.versions(packages[p].ifPackageInstalled))
                .reduce((m, c) => (Object.assign(Object.assign({}, m), { [c]: {
                    version: packages[c].version,
                    alwaysAddToPackageJson: packages[c].alwaysAddToPackageJson,
                } })), {});
        })
            .reduce((m, c) => (Object.assign(Object.assign({}, m), c)), {});
    }
    gt(v1, v2) {
        return semver_1.gt(normalizeVersion(v1), normalizeVersion(v2));
    }
    lte(v1, v2) {
        return semver_1.lte(normalizeVersion(v1), normalizeVersion(v2));
    }
}
exports.Migrator = Migrator;
function normalizeVersionWithTagCheck(version) {
    if (version === 'latest' || version === 'next')
        return version;
    return normalizeVersion(version);
}
function versionOverrides(overrides, param) {
    const res = {};
    overrides.split(',').forEach((p) => {
        const split = p.lastIndexOf('@');
        if (split === -1 || split === 0) {
            throw new Error(`Incorrect '${param}' section. Use --${param}="package@version"`);
        }
        const selectedPackage = p.substring(0, split).trim();
        const selectedVersion = p.substring(split + 1).trim();
        if (!selectedPackage || !selectedVersion) {
            throw new Error(`Incorrect '${param}' section. Use --${param}="package@version"`);
        }
        res[selectedPackage] = normalizeVersionWithTagCheck(selectedVersion);
    });
    return res;
}
function parseTargetPackageAndVersion(args) {
    if (!args) {
        throw new Error(`Provide the correct package name and version. E.g., @sinbix/core@2.0.0.`);
    }
    if (args.indexOf('@') > -1) {
        const i = args.lastIndexOf('@');
        if (i === 0) {
            const targetPackage = args.trim();
            const targetVersion = 'latest';
            return { targetPackage, targetVersion };
        }
        else {
            const targetPackage = args.substring(0, i);
            const maybeVersion = args.substring(i + 1);
            if (!targetPackage || !maybeVersion) {
                throw new Error(`Provide the correct package name and version. E.g., @sinbix/core@2.0.0.`);
            }
            const targetVersion = normalizeVersionWithTagCheck(maybeVersion);
            return { targetPackage, targetVersion };
        }
    }
    else {
        if (args.match(/[0-9]/) || args === 'latest' || args === 'next') {
            return {
                targetPackage: '@sinbix/core',
                targetVersion: normalizeVersionWithTagCheck(args),
            };
        }
        else {
            return {
                targetPackage: args,
                targetVersion: 'latest',
            };
        }
    }
}
function parseMigrationsOptions(args) {
    const options = utils_1.convertToCamelCase(minimist(args, {
        string: ['runMigrations', 'from', 'to'],
        alias: {
            runMigrations: 'run-migrations',
        },
    }));
    if (!options.runMigrations) {
        const from = options.from
            ? versionOverrides(options.from, 'from')
            : {};
        const to = options.to ? versionOverrides(options.to, 'to') : {};
        const { targetPackage, targetVersion } = parseTargetPackageAndVersion(args[0]);
        return {
            type: 'generateMigrations',
            targetPackage,
            targetVersion,
            from,
            to,
        };
    }
    else {
        return {
            type: 'runMigrations',
            runMigrations: options.runMigrations,
        };
    }
}
exports.parseMigrationsOptions = parseMigrationsOptions;
function versions(root, from) {
    return (packageName) => {
        try {
            if (from[packageName]) {
                return from[packageName];
            }
            const packageJsonPath = require.resolve(`${packageName}/package.json`, {
                paths: [root],
            });
            const content = fs_1.readFileSync(packageJsonPath);
            return JSON.parse(stripJsonComments(content.toString()))['version'];
        }
        catch (e) {
            return null;
        }
    };
}
// testing-fetch-start
function createFetcher(packageManager, logger) {
    const cache = {};
    return function f(packageName, packageVersion) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!cache[`${packageName}-${packageVersion}`]) {
                const dir = tmp_1.dirSync().name;
                logger.info(`Fetching ${packageName}@${packageVersion}`);
                const install = utils_1.getPackageManagerInstallCommand(packageManager);
                child_process_1.execSync(`${install} ${packageName}@${packageVersion}`, {
                    stdio: [],
                    cwd: dir,
                });
                const packageJsonPath = require.resolve(`${packageName}/package.json`, {
                    paths: [dir],
                });
                const json = JSON.parse(stripJsonComments(fs_1.readFileSync(packageJsonPath).toString()));
                let migrationsFile = json['sinbix-migrations'] || json['ng-update'];
                // migrationsFile is an object
                if (migrationsFile && migrationsFile.migrations) {
                    migrationsFile = migrationsFile.migrations;
                }
                // packageVersion can be a tag, resolvedVersion works with semver
                const resolvedVersion = json.version;
                try {
                    if (migrationsFile && typeof migrationsFile === 'string') {
                        const migrationsFilePath = require.resolve(`${packageName}/${migrationsFile}`, { paths: [dir] });
                        const json = JSON.parse(stripJsonComments(fs_1.readFileSync(migrationsFilePath).toString()));
                        cache[`${packageName}-${packageVersion}`] = {
                            version: resolvedVersion,
                            schematics: json.schematics,
                            packageJsonUpdates: json.packageJsonUpdates,
                        };
                    }
                    else {
                        cache[`${packageName}-${packageVersion}`] = {
                            version: resolvedVersion,
                        };
                    }
                }
                catch (e) {
                    logger.warn(`Could not find '${migrationsFile}' in '${packageName}'. Skipping it`);
                    cache[`${packageName}-${packageVersion}`] = {
                        version: resolvedVersion,
                    };
                }
            }
            return cache[`${packageName}-${packageVersion}`];
        });
    };
}
// testing-fetch-end
function createMigrationsFile(root, migrations) {
    fs_1.writeFileSync(path_1.join(root, 'migrations.json'), JSON.stringify({ migrations }, null, 2));
}
function updatePackageJson(root, updatedPackages) {
    const packageJsonPath = path_1.join(root, 'package.json');
    const packageJsonContent = fs_1.readFileSync(packageJsonPath).toString();
    const endOfFile = packageJsonContent.substring(packageJsonContent.lastIndexOf('}') + 1, packageJsonContent.length);
    const json = JSON.parse(stripJsonComments(packageJsonContent));
    Object.keys(updatedPackages).forEach((p) => {
        if (json.devDependencies && json.devDependencies[p]) {
            json.devDependencies[p] = updatedPackages[p].version;
        }
        else if (json.dependencies && json.dependencies[p]) {
            json.dependencies[p] = updatedPackages[p].version;
        }
        else if (updatedPackages[p].alwaysAddToPackageJson) {
            if (!json.dependencies)
                json.dependencies = {};
            json.dependencies[p] = updatedPackages[p].version;
        }
    });
    fs_1.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) + endOfFile);
}
function generateMigrationsJsonAndUpdatePackageJson(logger, root, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const packageManager = utils_1.detectPackageManager();
        try {
            logger.info(`Fetching meta data about packages.`);
            logger.info(`It may take a few minutes.`);
            const migrator = new Migrator({
                versions: versions(root, opts.from),
                fetch: createFetcher(packageManager, logger),
                from: opts.from,
                to: opts.to,
            });
            const { migrations, packageJson } = yield migrator.updatePackageJson(opts.targetPackage, opts.targetVersion);
            updatePackageJson(root, packageJson);
            if (migrations.length > 0) {
                createMigrationsFile(root, migrations);
                logger.info(`SINBIX The migrate command has run successfully.`);
                logger.info(`- package.json has been updated`);
                logger.info(`- migrations.json has been generated`);
                logger.info(`SINBIX Next steps:`);
                logger.info(`- Make sure package.json changes make sense and then run 'npm install' or 'yarn'`);
                logger.info(`- Run 'sinbix migrate --run-migrations=migrations.json'`);
            }
            else {
                logger.info(`SINBIX The migrate command has run successfully.`);
                logger.info(`- package.json has been updated`);
                logger.info(`- there are no migrations to run, so migrations.json has not been created.`);
                logger.info(`SINBIX Next steps:`);
                logger.info(`- Make sure package.json changes make sense and then run 'npm install' or 'yarn'`);
            }
        }
        catch (e) {
            logger.error(`SINBIX The migrate command failed. Try the following to migrate your workspace:`);
            logger.error(`> npx @sinbix/cli@latest migrate ${opts.targetPackage}@${opts.targetVersion}`);
            logger.error(`This will use the newest version of the migrate functionality, which might have your issue resolved.`);
            logger.error(`----------------------------------------------------------------------------------------------------`);
            throw e;
        }
    });
}
class MigrationEngineHost extends tools_1.NodeModulesEngineHost {
    constructor(logger) {
        super();
        this.nodeInstallLogPrinted = false;
        // Overwrite the original CLI node package executor with a new one that does basically nothing
        // since sinbix migrate doesn't do npm installs by itself
        // (https://github.com/angular/angular-cli/blob/5df776780deadb6be5048b3ab006a5d3383650dc/packages/angular_devkit/schematics/tools/workflow/node-workflow.ts#L41)
        this.registerTaskExecutor({
            name: options_1.NodePackageName,
            create: () => Promise.resolve(() => {
                return new Promise((res) => {
                    if (!this.nodeInstallLogPrinted) {
                        logger.warn(`An installation of node_modules has been required. Make sure to run it after the migration`);
                        this.nodeInstallLogPrinted = true;
                    }
                    res();
                });
            }),
        });
        this.registerTaskExecutor(node_2.BuiltinTaskExecutor.RunSchematic);
    }
    _resolveCollectionPath(name) {
        let collectionPath = undefined;
        if (name.startsWith('.') || name.startsWith('/')) {
            name = path_1.resolve(name);
        }
        if (path_1.extname(name)) {
            collectionPath = require.resolve(name);
        }
        else {
            const packageJsonPath = require.resolve(path_1.join(name, 'package.json'));
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const packageJson = require(packageJsonPath);
            let pkgJsonSchematics = packageJson['sinbix-migrations'];
            if (!pkgJsonSchematics) {
                pkgJsonSchematics = packageJson['ng-update'];
                if (!pkgJsonSchematics) {
                    throw new Error(`Could not find migrations in package: "${name}"`);
                }
            }
            if (typeof pkgJsonSchematics != 'string') {
                pkgJsonSchematics = pkgJsonSchematics.migrations;
            }
            collectionPath = path_1.resolve(path_1.dirname(packageJsonPath), pkgJsonSchematics);
        }
        try {
            if (collectionPath) {
                JSON.parse(stripJsonComments(fs_1.readFileSync(collectionPath).toString()));
                return collectionPath;
            }
        }
        catch (e) {
            throw new Error(`Invalid migration file in package: "${name}"`);
        }
        throw new Error(`Collection cannot be resolved: "${name}"`);
    }
}
class MigrationsWorkflow extends workflow_1.BaseWorkflow {
    constructor(host, logger) {
        super({
            host,
            engineHost: new MigrationEngineHost(logger),
            force: true,
            dryRun: false,
        });
    }
}
function runMigrations(logger, root, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const migrationsFile = JSON.parse(stripJsonComments(fs_1.readFileSync(path_1.join(root, opts.runMigrations)).toString()));
        const host = new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), core_1.normalize(root));
        const workflow = new MigrationsWorkflow(host, logger);
        let p = Promise.resolve(null);
        migrationsFile.migrations.forEach((m) => {
            p = p.then(() => {
                logger.info(`Running migration ${m.package}:${m.name}`);
                return workflow
                    .execute({
                    collection: m.package,
                    schematic: m.name,
                    options: {},
                    debug: false,
                    logger,
                })
                    .toPromise()
                    .then(() => {
                    logger.info(`Successfully finished ${m.package}:${m.name}`);
                    logger.info(`---------------------------------------------------------`);
                });
            });
        });
        yield p;
    });
}
function migrate(root, args, isVerbose = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = utils_1.getLogger({ verbose: isVerbose });
        return utils_1.handleErrors(logger, { verbose: isVerbose }, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const opts = parseMigrationsOptions(args);
            if (opts.type === 'generateMigrations') {
                yield generateMigrationsJsonAndUpdatePackageJson(logger, root, opts);
            }
            else {
                yield runMigrations(logger, root, opts);
            }
        }));
    });
}
exports.migrate = migrate;
//# sourceMappingURL=migrate.js.map