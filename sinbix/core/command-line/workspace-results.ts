import * as fs from 'fs';
import {
  directoryExists,
  readJsonFile,
  writeJsonFile,
} from '../utils/fileutils';
import { existsSync, unlinkSync } from 'fs';
import { ProjectGraphNode } from '../project-graph';
import { join } from 'path';
import * as fsExtra from 'fs-extra';
import { appRootPath } from "../utils/app-root";

const resultsDir = join(appRootPath, 'node_modules', '.cache', 'sinbix');
const resultsFile = join(resultsDir, 'results.json');

interface SinbixResults {
  command: string;
  results: { [key: string]: boolean };
}

export class WorkspaceResults {
  public startedWithFailedProjects: boolean;
  private commandResults: SinbixResults = {
    command: this.command,
    results: {},
  };

  get failedProjects() {
    return Object.entries(this.commandResults.results)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, result]) => !result)
      .map(([project]) => project);
  }

  public get hasFailure() {
    return Object.values(this.commandResults.results).some((result) => !result);
  }

  constructor(
    private command: string,
    private projects: Record<string, ProjectGraphNode>
  ) {
    const resultsExists = fs.existsSync(resultsFile);
    this.startedWithFailedProjects = false;
    if (resultsExists) {
      try {
        const commandResults = readJsonFile(resultsFile);
        this.startedWithFailedProjects = commandResults.command === command;
        if (this.startedWithFailedProjects) {
          this.commandResults = commandResults;
          this.invalidateOldResults();
        }
      } catch {
        /**
         * If we got here it is likely that RESULTS_FILE is not valid JSON.
         * It is safe to continue, and it does not make much sense to give the
         * user feedback as the file will be updated automatically.
         */
      }
    }
  }

  getResult(projectName: string): boolean {
    return this.commandResults.results[projectName];
  }

  saveResults() {
    try {
      if (!existsSync(resultsDir)) {
        fsExtra.ensureDirSync(resultsDir);
      }
    } catch (e) {
      if (!directoryExists(resultsDir)) {
        throw new Error(`Failed to create directory: ${resultsDir}`);
      }
    }
    if (Object.values<boolean>(this.commandResults.results).includes(false)) {
      writeJsonFile(resultsFile, this.commandResults);
    } else if (fs.existsSync(resultsFile)) {
      unlinkSync(resultsFile);
    }
  }

  setResult(projectName: string, result: boolean) {
    this.commandResults.results[projectName] = result;
  }

  private invalidateOldResults() {
    Object.keys(this.commandResults.results).forEach((projectName) => {
      if (!this.projects[projectName]) {
        delete this.commandResults.results[projectName];
      }
    });
  }
}
