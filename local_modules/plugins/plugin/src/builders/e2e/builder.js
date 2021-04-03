"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("./utils");
try {
    require('dotenv').config();
}
catch (e) { }
function runBuilder(options, context) {
    const normalizedOptions = utils_1.normalizeOptions(options);
    // return of({ success: true }).pipe(
    //   switchMap(() => {
    //     return from(
    //       context.scheduleBuilder('@sinbix/node:jest', {
    //         jestConfig: normalizedOptions.jestConfig,
    //         watch: false,
    //       })
    //     ).pipe(concatMap((run) => run.output));
    //   })
    // );
    return rxjs_1.from(context.scheduleBuilder('@sinbix/node:jest', {
        jestConfig: normalizedOptions.jestConfig,
        watch: false,
    })).pipe(operators_1.concatMap((run) => run.output));
}
exports.runBuilder = runBuilder;
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map