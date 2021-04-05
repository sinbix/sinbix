import { workspaceFileName } from './file-utils';
import { output } from './utils/output';
import { ImplicitJsonSubsetDependency, SinbixJson } from "./shared-interfaces";

export function assertWorkspaceValidity(workspaceJson, sinbixJson: SinbixJson) {
  const workspaceJsonProjects = Object.keys(workspaceJson.projects);
  const sinbixJsonProjects = Object.keys(sinbixJson.projects);

  if (minus(workspaceJsonProjects, sinbixJsonProjects).length > 0) {
    output.error({
      title: 'Configuration Error',
      bodyLines: [
        `${workspaceFileName()} and sinbix.json are out of sync. The following projects are missing in sinbix.json: ${minus(
          workspaceJsonProjects,
          sinbixJsonProjects
        ).join(', ')}`,
      ],
    });

    process.exit(1);
  }

  if (minus(sinbixJsonProjects, workspaceJsonProjects).length > 0) {
    output.error({
      title: 'Configuration Error',
      bodyLines: [
        `${workspaceFileName()} and sinbix.json are out of sync. The following projects are missing in ${workspaceFileName()}: ${minus(
          sinbixJsonProjects,
          workspaceJsonProjects
        ).join(', ')}`,
      ],
    });

    process.exit(1);
  }

  const projects = {
    ...workspaceJson.projects,
    ...sinbixJson.projects,
  };

  const invalidImplicitDependencies = new Map<string, string[]>();

  Object.entries<'*' | string[] | ImplicitJsonSubsetDependency>(
    sinbixJson.implicitDependencies || {}
  )
    .reduce((acc, entry) => {
      function recur(value, acc = []) {
        if (value === '*') {
          // do nothing since '*' is calculated and always valid.
        } else if (Array.isArray(value)) {
          acc.push([entry[0], value]);
        } else {
          Object.values(value).forEach((v) => {
            recur(v, acc);
          });
        }
      }
      recur(entry[1], acc);
      return acc;
    }, [])
    .reduce((map, [filename, projectNames]: [string, string[]]) => {
      detectAndSetInvalidProjectValues(map, filename, projectNames, projects);
      return map;
    }, invalidImplicitDependencies);

  sinbixJsonProjects
    .filter((sinbixJsonProjectName) => {
      const project = sinbixJson.projects[sinbixJsonProjectName];
      return !!project.implicitDependencies;
    })
    .reduce((map, sinbixJsonProjectName) => {
      const project = sinbixJson.projects[sinbixJsonProjectName];
      detectAndSetInvalidProjectValues(
        map,
        sinbixJsonProjectName,
        project.implicitDependencies,
        projects
      );
      return map;
    }, invalidImplicitDependencies);

  if (invalidImplicitDependencies.size === 0) {
    return;
  }

  let message = `The following implicitDependencies specified in sinbix.json are invalid:
  `;
  invalidImplicitDependencies.forEach((projectNames, key) => {
    const str = `  ${key}
    ${projectNames.map((projectName) => `    ${projectName}`).join('\n')}`;
    message += str;
  });

  output.error({
    title: 'Configuration Error',
    bodyLines: [message],
  });

  process.exit(1);
}

function detectAndSetInvalidProjectValues(
  map: Map<string, string[]>,
  sourceName: string,
  desiredProjectNames: string[],
  validProjects: any
) {
  const invalidProjects = desiredProjectNames.filter(
    (projectName) => !validProjects[projectName]
  );
  if (invalidProjects.length > 0) {
    map.set(sourceName, invalidProjects);
  }
}

function minus(a: string[], b: string[]): string[] {
  const res = [];
  a.forEach((aa) => {
    if (!b.find((bb) => bb === aa)) {
      res.push(aa);
    }
  });
  return res;
}
