"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
if (process.env.SINBIX_PERF_LOGGING) {
    const obs = new perf_hooks_1.PerformanceObserver((list) => {
        const entry = list.getEntries()[0];
        console.log(`Time for '${entry.name}'`, entry.duration);
    });
    obs.observe({ entryTypes: ['measure'], buffered: false });
}
//# sourceMappingURL=perf-logging.js.map