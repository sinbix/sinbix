import { chain } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import {
  getDestination,
  getNewProjectName,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@sinbix/utils';
import { SinbixJson } from '@sinbix/core';

export function updateProjectConfig(options: NormalizedOptions) {
  return chain([updateWorkspace(options), updateNxConfig(options)]);
}

function updateWorkspace(options: NormalizedOptions) {
  return updateWorkspaceInTree((workspace) => {
    const project = workspace.projects[options.projectName];
    const newProjectName = getNewProjectName(options.destination);

    // update root path refs in that project only
    const oldProject = JSON.stringify(project);
    const newProject = oldProject.replace(
      new RegExp(project.root, 'g'),
      getDestination(options.destination)
    );

    // rename
    delete workspace.projects[options.projectName];
    workspace.projects[newProjectName] = JSON.parse(newProject);

    // update target refs
    const strWorkspace = JSON.stringify(workspace);
    workspace = JSON.parse(
      strWorkspace.replace(
        new RegExp(`${options.projectName}:`, 'g'),
        `${newProjectName}:`
      )
    );

    // update default project (if necessary)
    if (
      workspace.defaultProject &&
      workspace.defaultProject === options.projectName
    ) {
      workspace.defaultProject = newProjectName;
    }

    return workspace;
  });
}

function updateNxConfig(options: NormalizedOptions) {
  return updateJsonInTree<SinbixJson>('nx.json', (json) => {
    Object.values(json.projects).forEach((project) => {
      if (project.implicitDependencies) {
        const index = project.implicitDependencies.indexOf(options.projectName);
        if (index !== -1) {
          project.implicitDependencies[index] = getNewProjectName(
            options.destination
          );
        }
      }
    });
    json.projects[getNewProjectName(options.destination)] = {
      ...json.projects[options.projectName],
    };
    delete json.projects[options.projectName];
    return json;
  });
}
