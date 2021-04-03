"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
const path_1 = require("path");
function addFiles(options) {
    return schematics_1.chain([
        addBase(options),
        options.publishable ? addPublishable(options) : schematics_1.noop(),
        options.readme ? addReadme(options) : schematics_1.noop(),
        options.main ? addMain(options) : schematics_1.noop(),
    ]);
    // return mergeWith(
    //   apply(url(`./files/base`), [
    //     applyTemplates({
    //       ...options,
    //       ...names(options.name),
    //       offsetFromRoot: offsetFromRoot(options.projectRoot),
    //     }),
    //     move(options.projectRoot),
    //     // options.publishable
    //     //   ? noop()
    //     //   : filter((file) => !file.endsWith('package.json')),
    //   ])
    // );
}
exports.addFiles = addFiles;
function addBase(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files/base`), [
        schematics_1.applyTemplates(Object.assign(Object.assign({}, options), { offsetFromRoot: utils_1.offsetFromRoot(options.projectRoot) })),
        schematics_1.move(options.projectRoot),
    ]));
}
function addPublishable(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files/publishable`), [
        schematics_1.applyTemplates(Object.assign({}, options)),
        schematics_1.move(options.projectRoot),
    ]));
}
function addReadme(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files/readme`), [
        schematics_1.applyTemplates(Object.assign({}, options)),
        schematics_1.move(options.projectRoot),
    ]));
}
function addMain(options) {
    return (host) => {
        host.create(path_1.join(options.projectRoot, options.main), '');
    };
}
//# sourceMappingURL=add-files.js.map