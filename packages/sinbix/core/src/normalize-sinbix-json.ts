import { SinbixJson } from './shared-interfaces';

export function normalizeSinbixJson(
  sinbixJson: SinbixJson
): SinbixJson<string[]> {
  return sinbixJson.implicitDependencies
    ? {
        ...sinbixJson,
        implicitDependencies: Object.entries(
          sinbixJson.implicitDependencies
        ).reduce((acc, [key, val]) => {
          acc[key] = recur(val);
          return acc;

          function recur(v: '*' | string[] | {}): string[] | {} {
            if (v === '*') {
              return Object.keys(sinbixJson.projects);
            } else if (Array.isArray(v)) {
              return v;
            } else {
              return Object.keys(v).reduce((xs, x) => {
                xs[x] = recur(v[x]);
                return xs;
              }, {});
            }
          }
        }, {}),
      }
    : (sinbixJson as SinbixJson<string[]>);
}
