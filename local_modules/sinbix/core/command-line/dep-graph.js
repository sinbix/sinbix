"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGraph = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const http = require("http");
const opn = require("opn");
const path_1 = require("path");
const url = require("url");
const project_graph_1 = require("../project-graph");
const app_root_1 = require("../utils/app-root");
const output_1 = require("../utils/output");
// maps file extention to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt',
};
function projectsToHtml(projects, graph, affected, focus, groupByFolder, exclude) {
    let f = fs_1.readFileSync(path_1.join(__dirname, '../dep-graph/index.html')).toString();
    f = f
        .replace(`projects: []`, `projects: ${JSON.stringify(projects)}`)
        .replace(`dependencies: []`, `dependencies: ${JSON.stringify(graph.dependencies)}`)
        .replace(`affected: []`, `affected: ${JSON.stringify(affected)}`)
        .replace(`exclude: []`, `exclude: ${JSON.stringify(exclude)}`);
    if (focus) {
        f = f.replace(`focused: null`, `focused: '${focus}'`);
    }
    return f;
}
function projectExists(projects, projectToFind) {
    return (projects.find((project) => project.name === projectToFind) !== undefined);
}
function hasPath(graph, target, node, visited) {
    if (target === node)
        return true;
    for (const d of graph.dependencies[node] || []) {
        if (visited.indexOf(d.target) > -1)
            continue;
        visited.push(d.target);
        if (hasPath(graph, target, d.target, visited))
            return true;
    }
    return false;
}
function filterGraph(graph, focus, exclude) {
    const projectNames = Object.values(graph.nodes).map((project) => project.name);
    let filteredProjectNames;
    if (focus !== null) {
        filteredProjectNames = new Set();
        projectNames.forEach((p) => {
            const isInPath = hasPath(graph, p, focus, []) || hasPath(graph, focus, p, []);
            if (isInPath) {
                filteredProjectNames.add(p);
            }
        });
    }
    else {
        filteredProjectNames = new Set(projectNames);
    }
    if (exclude.length !== 0) {
        exclude.forEach((p) => filteredProjectNames.delete(p));
    }
    const filteredGraph = {
        nodes: {},
        dependencies: {},
    };
    filteredProjectNames.forEach((p) => {
        filteredGraph.nodes[p] = graph.nodes[p];
        filteredGraph.dependencies[p] = graph.dependencies[p];
    });
    return filteredGraph;
}
function generateGraph(args, affectedProjects) {
    let graph = project_graph_1.onlyWorkspaceProjects(project_graph_1.createProjectGraph());
    const projects = Object.values(graph.nodes);
    projects.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    if (args.focus !== undefined) {
        if (!projectExists(projects, args.focus)) {
            output_1.output.error({
                title: `Project to focus does not exist.`,
                bodyLines: [`You provided --focus=${args.focus}`],
            });
            process.exit(1);
        }
    }
    if (args.exclude !== undefined) {
        const invalidExcludes = [];
        args.exclude.forEach((project) => {
            if (!projectExists(projects, project)) {
                invalidExcludes.push(project);
            }
        });
        if (invalidExcludes.length > 0) {
            output_1.output.error({
                title: `The following projects provided to --exclude do not exist:`,
                bodyLines: invalidExcludes,
            });
            process.exit(1);
        }
    }
    let html;
    if (args.file === undefined || args.file.endsWith('html')) {
        html = projectsToHtml(projects, graph, affectedProjects, args.focus || null, args.groupByFolder || false, args.exclude || []);
    }
    else {
        graph = filterGraph(graph, args.focus || null, args.exclude || []);
    }
    if (args.file) {
        let folder = app_root_1.appRootPath;
        let filename = args.file;
        const ext = args.file.replace(/^.*\.(.*)$/, '$1');
        if (ext === 'html') {
            if (filename.includes('/')) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_match, _folder, _file] = /^(.*)\/([^/]*\.(.*))$/.exec(args.file);
                folder = `${app_root_1.appRootPath}/${_folder}`;
                filename = _file;
            }
            filename = `${folder}/${filename}`;
            const assetsFolder = `${folder}/static`;
            const assets = [];
            fs_extra_1.copySync(path_1.join(__dirname, '../dep-graph'), assetsFolder, {
                filter: (src, dest) => {
                    const isntHtml = !/index\.html/.test(dest);
                    if (isntHtml && dest.includes('.')) {
                        assets.push(dest);
                    }
                    return isntHtml;
                },
            });
            html = html.replace(/src="/g, 'src="static/');
            html = html.replace(/href="styles/g, 'href="static/styles');
            html = html.replace('<base href="/">', '');
            html = html.replace(/type="module"/g, '');
            fs_1.writeFileSync(filename, html);
            output_1.output.success({
                title: `HTML output created in ${folder}`,
                bodyLines: [filename, ...assets],
            });
        }
        else if (ext === 'json') {
            filename = `${folder}/${filename}`;
            fs_1.writeFileSync(filename, JSON.stringify({
                graph,
                affectedProjects,
                criticalPath: affectedProjects,
            }, null, 2));
            output_1.output.success({
                title: `JSON output created in ${folder}`,
                bodyLines: [filename],
            });
        }
        else {
            output_1.output.error({
                title: `Please specify a filename with either .json or .html extension.`,
                bodyLines: [`You provided --file=${args.file}`],
            });
            process.exit(1);
        }
    }
    else {
        startServer(html, args.host || '127.0.0.1', args.port || 4211);
    }
}
exports.generateGraph = generateGraph;
function startServer(html, host, port = 4211) {
    const app = http.createServer((req, res) => {
        // parse URL
        const parsedUrl = url.parse(req.url);
        // extract URL path
        // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
        // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
        // by limiting the path to current directory only
        const sanitizePath = path_1.normalize(parsedUrl.pathname).replace(/^(\.\.[/\\])+/, '');
        const pathname = path_1.join(__dirname, '../dep-graph/', sanitizePath);
        fs_1.exists(pathname, function (exist) {
            if (!exist) {
                // if the file is not found, return 404
                res.statusCode = 404;
                res.end(`File ${pathname} not found!`);
                return;
            }
            // if is a directory, then look for index.html
            if (fs_1.statSync(pathname).isDirectory()) {
                // pathname += '/index.html';
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
                return;
            }
            // read file from file system
            fs_1.readFile(pathname, function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${err}.`);
                }
                else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path_1.parse(pathname).ext;
                    // if the file is found, set Content-type and send data
                    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                    res.end(data);
                }
            });
        });
    });
    app.listen(port, host);
    output_1.output.note({
        title: `Dep graph started at http://${host}:${port}`,
    });
    opn(`http://${host}:${port}`, {
        wait: false,
    });
}
//# sourceMappingURL=dep-graph.js.map