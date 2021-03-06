"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyWithSkipExisting = exports.renameDirSyncInTree = exports.renameSyncInTree = exports.replaceNodeValue = exports.insertImport = exports.createOrUpdate = exports.getProjectConfig = exports.updatePackageJsonDependencies = exports.addDepsToPackageJson = exports.readWorkspace = exports.addProjectToSinbixJsonInTree = exports.updateSinbixJsonInTree = exports.appsDir = exports.libsDir = exports.readSinbixJsonInTree = exports.updateWorkspaceInTree = exports.updateJsonInTree = exports.allFilesInDirInHost = exports.getFileDataInHost = exports.getFullProjectGraphFromHost = exports.getProjectGraphFromHost = exports.readJsonInTree = exports.insert = exports.addGlobal = exports.getImport = exports.addIncludeToTsConfig = exports.offset = exports.findClass = exports.addMethod = exports.addParameterToConstructor = exports.ReplaceChange = exports.RemoveChange = exports.InsertChange = exports.NoopChange = exports.getSourceNodes = exports.findNodes = exports.sortObjectByKeys = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT- style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const stripJsonComments = require("strip-json-comments");
const fileutils_1 = require("@sinbix/core/utils/fileutils");
const project_graph_1 = require("@sinbix/core/project-graph");
const core_1 = require("@angular-devkit/core");
const rules_1 = require("./rules");
const cli_config_utils_1 = require("./cli-config-utils");
function nodesByPosition(first, second) {
    return first.getStart() - second.getStart();
}
function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
    // sort() has a side effect, so make a copy so that we won't overwrite the parent's object.
    let lastItem = [...nodes].sort(nodesByPosition).pop();
    if (!lastItem) {
        throw new Error();
    }
    if (syntaxKind) {
        lastItem = findNodes(lastItem, syntaxKind).sort(nodesByPosition).pop();
    }
    if (!lastItem && fallbackPos == undefined) {
        throw new Error(`tried to insert ${toInsert} as first occurrence with no fallback position`);
    }
    const lastItemPosition = lastItem ? lastItem.getEnd() : fallbackPos;
    return new InsertChange(file, lastItemPosition, toInsert);
}
function sortObjectByKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
        return Object.assign(Object.assign({}, result), { [key]: obj[key] });
    }, {});
}
exports.sortObjectByKeys = sortObjectByKeys;
function findNodes(node, kind, max = Infinity) {
    if (!node || max == 0) {
        return [];
    }
    const arr = [];
    const hasMatch = Array.isArray(kind)
        ? kind.includes(node.kind)
        : node.kind === kind;
    if (hasMatch) {
        arr.push(node);
        max--;
    }
    if (max > 0) {
        for (const child of node.getChildren()) {
            findNodes(child, kind, max).forEach((node) => {
                if (max > 0) {
                    arr.push(node);
                }
                max--;
            });
            if (max <= 0) {
                break;
            }
        }
    }
    return arr;
}
exports.findNodes = findNodes;
function getSourceNodes(sourceFile) {
    const nodes = [sourceFile];
    const result = [];
    while (nodes.length > 0) {
        const node = nodes.shift();
        if (node) {
            result.push(node);
            if (node.getChildCount(sourceFile) >= 0) {
                nodes.unshift(...node.getChildren());
            }
        }
    }
    return result;
}
exports.getSourceNodes = getSourceNodes;
class NoopChange {
    constructor() {
        this.type = 'noop';
        this.description = 'No operation.';
        this.order = Infinity;
        this.path = null;
    }
    apply() {
        return Promise.resolve();
    }
}
exports.NoopChange = NoopChange;
class InsertChange {
    constructor(path, pos, toAdd) {
        this.path = path;
        this.pos = pos;
        this.toAdd = toAdd;
        this.type = 'insert';
        if (pos < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
        this.order = pos;
    }
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.pos);
            return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
        });
    }
}
exports.InsertChange = InsertChange;
class RemoveChange {
    constructor(path, pos, toRemove) {
        this.path = path;
        this.pos = pos;
        this.toRemove = toRemove;
        this.type = 'remove';
        if (pos < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Removed ${toRemove} into position ${pos} of ${path}`;
        this.order = pos;
    }
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.pos + this.toRemove.length);
            return host.write(this.path, `${prefix}${suffix}`);
        });
    }
}
exports.RemoveChange = RemoveChange;
class ReplaceChange {
    constructor(path, pos, oldText, newText) {
        this.path = path;
        this.pos = pos;
        this.oldText = oldText;
        this.newText = newText;
        this.type = 'replace';
        if (pos < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
        this.order = pos;
    }
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.pos + this.oldText.length);
            const text = content.substring(this.pos, this.pos + this.oldText.length);
            if (text !== this.oldText) {
                return Promise.reject(new Error(`Invalid replace: "${text}" != "${this.oldText}".`));
            }
            return host.write(this.path, `${prefix}${this.newText}${suffix}`);
        });
    }
}
exports.ReplaceChange = ReplaceChange;
function addParameterToConstructor(source, modulePath, opts) {
    const clazz = findClass(source, opts.className);
    const constructor = clazz.members.filter((m) => m.kind === ts.SyntaxKind.Constructor)[0];
    if (constructor) {
        throw new Error('Should be tested');
    }
    else {
        const methodHeader = `constructor(${opts.param})`;
        return addMethod(source, modulePath, {
            className: opts.className,
            methodHeader,
            body: null,
        });
    }
}
exports.addParameterToConstructor = addParameterToConstructor;
function addMethod(source, modulePath, opts) {
    const clazz = findClass(source, opts.className);
    const body = opts.body
        ? `
${opts.methodHeader} {
${offset(opts.body, 1, false)}
}
`
        : `
${opts.methodHeader} {}
`;
    return [new InsertChange(modulePath, clazz.end - 1, offset(body, 1, true))];
}
exports.addMethod = addMethod;
function findClass(source, className, silent = false) {
    const nodes = getSourceNodes(source);
    const clazz = (nodes.filter((n) => n.kind === ts.SyntaxKind.ClassDeclaration &&
        n.name.text === className)[0]);
    if (!clazz && !silent) {
        throw new Error(`Cannot find class '${className}'`);
    }
    return clazz;
}
exports.findClass = findClass;
function offset(text, numberOfTabs, wrap) {
    const lines = text
        .trim()
        .split('\n')
        .map((line) => {
        let tabs = '';
        for (let c = 0; c < numberOfTabs; ++c) {
            tabs += '  ';
        }
        return `${tabs}${line}`;
    })
        .join('\n');
    return wrap ? `\n${lines}\n` : lines;
}
exports.offset = offset;
function addIncludeToTsConfig(tsConfigPath, source, include) {
    const includeKeywordPos = source.text.indexOf('"include":');
    if (includeKeywordPos > -1) {
        const includeArrayEndPos = source.text.indexOf(']', includeKeywordPos);
        return [new InsertChange(tsConfigPath, includeArrayEndPos, include)];
    }
    else {
        return [];
    }
}
exports.addIncludeToTsConfig = addIncludeToTsConfig;
function getImport(source, predicate) {
    const allImports = findNodes(source, ts.SyntaxKind.ImportDeclaration);
    const matching = allImports.filter((i) => predicate(i.moduleSpecifier.getText()));
    return matching.map((i) => {
        const moduleSpec = i.moduleSpecifier
            .getText()
            .substring(1, i.moduleSpecifier.getText().length - 1);
        const t = i.importClause.namedBindings.getText();
        const bindings = t
            .replace('{', '')
            .replace('}', '')
            .split(',')
            .map((q) => q.trim());
        return { moduleSpec, bindings };
    });
}
exports.getImport = getImport;
function addGlobal(source, modulePath, statement) {
    const allImports = findNodes(source, ts.SyntaxKind.ImportDeclaration);
    if (allImports.length > 0) {
        const lastImport = allImports[allImports.length - 1];
        return [
            new InsertChange(modulePath, lastImport.end + 1, `\n${statement}\n`),
        ];
    }
    else {
        return [new InsertChange(modulePath, 0, `${statement}\n`)];
    }
}
exports.addGlobal = addGlobal;
function insert(host, modulePath, changes) {
    if (changes.length < 1) {
        return;
    }
    // sort changes so that the highest pos goes first
    const orderedChanges = changes.sort((a, b) => b.order - a.order);
    const recorder = host.beginUpdate(modulePath);
    for (const change of orderedChanges) {
        if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
        else if (change instanceof RemoveChange) {
            recorder.remove(change.pos - 1, change.toRemove.length + 1);
        }
        else if (change instanceof ReplaceChange) {
            recorder.remove(change.pos, change.oldText.length);
            recorder.insertLeft(change.pos, change.newText);
        }
        else if (change.type === 'noop') {
            // do nothing
        }
        else {
            throw new Error(`Unexpected Change '${change.constructor.name}'`);
        }
    }
    host.commitUpdate(recorder);
}
exports.insert = insert;
/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
function readJsonInTree(host, path) {
    var _a;
    if (!host.exists(path)) {
        throw new Error(`Cannot find ${path}`);
    }
    const contents = stripJsonComments((_a = host.read(path)) === null || _a === void 0 ? void 0 : _a.toString('utf-8'));
    try {
        return JSON.parse(contents);
    }
    catch (e) {
        throw new Error(`Cannot parse ${path}: ${e.message}`);
    }
}
exports.readJsonInTree = readJsonInTree;
/**
 * Method for utilizing the project graph in schematics
 */
function getProjectGraphFromHost(host) {
    return project_graph_1.onlyWorkspaceProjects(getFullProjectGraphFromHost(host));
}
exports.getProjectGraphFromHost = getProjectGraphFromHost;
function getFullProjectGraphFromHost(host) {
    const workspaceJson = readJsonInTree(host, cli_config_utils_1.getWorkspacePath(host));
    const sinbixJson = readJsonInTree(host, '/sinbix.json');
    const fileRead = (f) => {
        try {
            return host.read(f).toString();
        }
        catch (e) {
            throw new Error(`${f} does not exist`);
        }
    };
    const workspaceFiles = [];
    workspaceFiles.push(...allFilesInDirInHost(host, core_1.normalize(''), { recursive: false }).map((f) => getFileDataInHost(host, f)));
    workspaceFiles.push(...allFilesInDirInHost(host, core_1.normalize('tools')).map((f) => getFileDataInHost(host, f)));
    // Add files for workspace projects
    Object.keys(workspaceJson.projects).forEach((projectName) => {
        const project = workspaceJson.projects[projectName];
        workspaceFiles.push(...allFilesInDirInHost(host, core_1.normalize(project.root)).map((f) => getFileDataInHost(host, f)));
    });
    return project_graph_1.createProjectGraph(workspaceJson, sinbixJson, workspaceFiles, fileRead, false);
}
exports.getFullProjectGraphFromHost = getFullProjectGraphFromHost;
function getFileDataInHost(host, path) {
    return {
        file: path,
        ext: core_1.extname(core_1.normalize(path)),
        hash: '',
    };
}
exports.getFileDataInHost = getFileDataInHost;
function allFilesInDirInHost(host, path, options = { recursive: true }) {
    const dir = host.getDir(path);
    const res = [];
    dir.subfiles.forEach((p) => {
        res.push(core_1.join(path, p));
    });
    if (!options.recursive) {
        return res;
    }
    dir.subdirs.forEach((p) => {
        res.push(...allFilesInDirInHost(host, core_1.join(path, p)));
    });
    return res;
}
exports.allFilesInDirInHost = allFilesInDirInHost;
/**
 * This method is specifically for updating JSON in a Tree
 * @param path Path of JSON file in the Tree
 * @param callback Manipulation of the JSON data
 * @returns A rule which updates a JSON file file in a Tree
 */
function updateJsonInTree(path, callback) {
    return (host, context) => {
        if (!host.exists(path)) {
            host.create(path, fileutils_1.serializeJson(callback({}, context)));
            return host;
        }
        host.overwrite(path, fileutils_1.serializeJson(callback(readJsonInTree(host, path), context)));
        return host;
    };
}
exports.updateJsonInTree = updateJsonInTree;
function updateWorkspaceInTree(callback) {
    return (host, context) => {
        const path = cli_config_utils_1.getWorkspacePath(host);
        host.overwrite(path, fileutils_1.serializeJson(callback(readJsonInTree(host, path), context, host)));
        return host;
    };
}
exports.updateWorkspaceInTree = updateWorkspaceInTree;
function readSinbixJsonInTree(host) {
    return readJsonInTree(host, 'sinbix.json');
}
exports.readSinbixJsonInTree = readSinbixJsonInTree;
function libsDir(host) {
    const json = readJsonInTree(host, 'sinbix.json');
    return json && json.workspaceLayout && json.workspaceLayout.libsDir
        ? json.workspaceLayout.libsDir
        : 'libs';
}
exports.libsDir = libsDir;
function appsDir(host) {
    const json = readJsonInTree(host, 'sinbix.json');
    return json && json.workspaceLayout && json.workspaceLayout.appsDir
        ? json.workspaceLayout.appsDir
        : 'apps';
}
exports.appsDir = appsDir;
function updateSinbixJsonInTree(callback) {
    return (host, context) => {
        host.overwrite('sinbix.json', fileutils_1.serializeJson(callback(readJsonInTree(host, 'sinbix.json'), context)));
        return host;
    };
}
exports.updateSinbixJsonInTree = updateSinbixJsonInTree;
function addProjectToSinbixJsonInTree(projectName, options) {
    const defaultOptions = {
        tags: [],
    };
    return updateSinbixJsonInTree((json) => {
        json.projects[projectName] = Object.assign(Object.assign({}, defaultOptions), options);
        return json;
    });
}
exports.addProjectToSinbixJsonInTree = addProjectToSinbixJsonInTree;
function readWorkspace(host) {
    const path = cli_config_utils_1.getWorkspacePath(host);
    return readJsonInTree(host, path);
}
exports.readWorkspace = readWorkspace;
/**
 * verifies whether the given packageJson dependencies require an update
 * given the deps & devDeps passed in
 */
function requiresAddingOfPackages(packageJsonFile, deps, devDeps) {
    let needsDepsUpdate = false;
    let needsDevDepsUpdate = false;
    packageJsonFile.dependencies = packageJsonFile.dependencies || {};
    packageJsonFile.devDependencies = packageJsonFile.devDependencies || {};
    if (Object.keys(deps).length > 0) {
        needsDepsUpdate = Object.keys(deps).some((entry) => !packageJsonFile.dependencies[entry]);
    }
    if (Object.keys(devDeps).length > 0) {
        needsDevDepsUpdate = Object.keys(devDeps).some((entry) => !packageJsonFile.devDependencies[entry]);
    }
    return needsDepsUpdate || needsDevDepsUpdate;
}
/**
 * Updates the package.json given the passed deps and/or devDeps. Only updates
 * if the packages are not yet present
 *
 * @param host the schematic tree
 * @param deps the package.json dependencies to add
 * @param devDeps the package.json devDependencies to add
 * @param addInstall default `true`; set to false to avoid installs
 */
function addDepsToPackageJson(deps, devDeps, addInstall = true) {
    return (host) => {
        const currentPackageJson = readJsonInTree(host, 'package.json');
        if (requiresAddingOfPackages(currentPackageJson, deps, devDeps)) {
            return schematics_1.chain([
                updateJsonInTree('package.json', (json) => {
                    json.dependencies = Object.assign(Object.assign(Object.assign({}, (json.dependencies || {})), deps), (json.dependencies || {}));
                    json.devDependencies = Object.assign(Object.assign(Object.assign({}, (json.devDependencies || {})), devDeps), (json.devDependencies || {}));
                    json.dependencies = sortObjectByKeys(json.dependencies);
                    json.devDependencies = sortObjectByKeys(json.devDependencies);
                    return json;
                }),
                rules_1.addInstallTask({
                    skipInstall: !addInstall,
                }),
            ]);
        }
        else {
            return schematics_1.noop();
        }
    };
}
exports.addDepsToPackageJson = addDepsToPackageJson;
function updatePackageJsonDependencies(deps, devDeps, addInstall = true) {
    return schematics_1.chain([
        updateJsonInTree('package.json', (json) => {
            json.dependencies = Object.assign(Object.assign({}, (json.dependencies || {})), deps);
            json.devDependencies = Object.assign(Object.assign({}, (json.devDependencies || {})), devDeps);
            json.dependencies = sortObjectByKeys(json.dependencies);
            json.devDependencies = sortObjectByKeys(json.devDependencies);
            return json;
        }),
        rules_1.addInstallTask({
            skipInstall: !addInstall,
        }),
    ]);
}
exports.updatePackageJsonDependencies = updatePackageJsonDependencies;
function getProjectConfig(host, name) {
    const workspaceJson = readJsonInTree(host, cli_config_utils_1.getWorkspacePath(host));
    const projectConfig = workspaceJson.projects[name];
    if (!projectConfig) {
        throw new Error(`Cannot find project '${name}'`);
    }
    else {
        return projectConfig;
    }
}
exports.getProjectConfig = getProjectConfig;
function createOrUpdate(host, path, content) {
    if (host.exists(path)) {
        host.overwrite(path, content);
    }
    else {
        host.create(path, content);
    }
}
exports.createOrUpdate = createOrUpdate;
function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false) {
    const rootNode = source;
    const allImports = findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
    // get nodes that map to import statements from the file fileName
    const relevantImports = allImports.filter((node) => {
        // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
        const importFiles = node
            .getChildren()
            .filter((child) => child.kind === ts.SyntaxKind.StringLiteral)
            .map((n) => n.text);
        return importFiles.filter((file) => file === fileName).length === 1;
    });
    if (relevantImports.length > 0) {
        let importsAsterisk = false;
        // imports from import file
        const imports = [];
        relevantImports.forEach((n) => {
            Array.prototype.push.apply(imports, findNodes(n, ts.SyntaxKind.Identifier));
            if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                importsAsterisk = true;
            }
        });
        // if imports * from fileName, don't add symbolName
        if (importsAsterisk) {
            return new NoopChange();
        }
        const importTextNodes = imports.filter((n) => n.text === symbolName);
        // insert import if it's not there
        if (importTextNodes.length === 0) {
            const fallbackPos = findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
            return insertAfterLastOccurrence(imports, `, ${symbolName}`, fileToEdit, fallbackPos);
        }
        return new NoopChange();
    }
    // no such import declaration exists
    const useStrict = findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const open = isDefault ? '' : '{ ';
    const close = isDefault ? '' : ' }';
    // if there are no imports or 'use strict' statement, insert import at beginning of file
    const insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
    const separator = insertAtBeginning ? '' : ';\n';
    const toInsert = `${separator}import ${open}${symbolName}${close}` +
        ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;
    return insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
}
exports.insertImport = insertImport;
function replaceNodeValue(host, modulePath, node, content) {
    insert(host, modulePath, [
        new ReplaceChange(modulePath, node.getStart(node.getSourceFile()), node.getFullText(), content),
    ]);
}
exports.replaceNodeValue = replaceNodeValue;
function renameSyncInTree(tree, from, to, cb) {
    if (!tree.exists(from)) {
        cb(`Path: ${from} does not exist`);
    }
    else if (tree.exists(to)) {
        cb(`Path: ${to} already exists`);
    }
    else {
        renameFile(tree, from, to);
        cb(null);
    }
}
exports.renameSyncInTree = renameSyncInTree;
function renameDirSyncInTree(tree, from, to, cb) {
    const dir = tree.getDir(from);
    if (!dirExists(dir)) {
        cb(`Path: ${from} does not exist`);
        return;
    }
    dir.visit((path) => {
        const destination = path.replace(from, to);
        renameFile(tree, path, destination);
    });
    cb(null);
}
exports.renameDirSyncInTree = renameDirSyncInTree;
function dirExists(dir) {
    return dir.subdirs.length + dir.subfiles.length !== 0;
}
function renameFile(tree, from, to) {
    const buffer = tree.read(from);
    if (!buffer) {
        return;
    }
    tree.create(to, buffer.toString());
    tree.delete(from);
}
/**
 * Applies a template merge but skips for already existing entries
 */
function applyWithSkipExisting(source, rules) {
    return (tree, _context) => {
        const rule = schematics_1.mergeWith(schematics_1.apply(source, [
            ...rules,
            schematics_1.forEach((fileEntry) => {
                if (tree.exists(fileEntry.path)) {
                    return null;
                }
                return fileEntry;
            }),
        ]));
        return rule(tree, _context);
    };
}
exports.applyWithSkipExisting = applyWithSkipExisting;
//# sourceMappingURL=ast-utils.js.map