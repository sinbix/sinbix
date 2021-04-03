"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTasks = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
function addTasks(options) {
    return (host, context) => {
        if (!options.skipInstall) {
            context.addTask(new tasks_1.NodePackageInstallTask(options.directory));
        }
        if (!options.skipGit) {
            const commit = typeof options.commit == 'object'
                ? options.commit
                : !!options.commit
                    ? {}
                    : false;
            context.addTask(new tasks_1.RepositoryInitializerTask(options.directory, commit));
        }
    };
}
exports.addTasks = addTasks;
//# sourceMappingURL=add-tasks.js.map