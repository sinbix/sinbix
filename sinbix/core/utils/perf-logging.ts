import { PerformanceObserver } from 'perf_hooks';

if (process.env.SINBIX_PERF_LOGGING) {
  const obs = new PerformanceObserver((list) => {
    const entry = list.getEntries()[0];
    console.log(`Time for '${entry.name}'`, entry.duration);
  });
  obs.observe({ entryTypes: ['measure'], buffered: false });
}
