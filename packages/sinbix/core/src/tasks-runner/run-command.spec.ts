import { TasksRunner } from './tasks-runner';
import defaultTaskRunner from './default-tasks-runner';
import { getRunner } from './run-command';
import { SinbixJson } from '../shared-interfaces';

describe('getRunner', () => {
  let nxJson: SinbixJson;
  let mockRunner: TasksRunner;
  let overrides: any;

  beforeEach(() => {
    nxJson = {
      npmScope: 'proj',
      projects: {},
    };
    mockRunner = jest.fn();
    overrides = { foo: 'bar' };
  });

  it('gets a default runner when runner is not defined in the nx json', async () => {
    const { tasksRunner, tasksOptions } = await getRunner({}, nxJson, overrides);

    expect(tasksRunner).toEqual(defaultTaskRunner);
    expect(tasksOptions).toEqual(overrides);
  });

  it('gets a default runner when default options are not configured', async () => {
    const { tasksRunner, tasksOptions } = await getRunner({}, nxJson, overrides);

    expect(tasksRunner).toEqual(defaultTaskRunner);
    expect(tasksOptions).toEqual(overrides);
  });

  it('gets a custom task runner', async () => {
    jest.mock('custom-runner', () => mockRunner, {
      virtual: true,
    });

    nxJson.tasksRunnerOptions = {
      custom: {
        runner: 'custom-runner',
      },
    };

    const { tasksRunner, tasksOptions } = await getRunner(
      { runner: 'custom' },
      nxJson,
      overrides
    );

    expect(tasksRunner).toEqual(mockRunner);
    expect(tasksOptions).toEqual(overrides);
  });

  it('gets a custom task runner with options', async () => {
    jest.mock('custom-runner2', () => mockRunner, {
      virtual: true,
    });

    nxJson.tasksRunnerOptions = {
      custom: {
        runner: 'custom-runner2',
        options: {
          runnerOption: 'runner-option',
        },
      },
    };

    const { tasksRunner, tasksOptions } = await getRunner(
      { runner: 'custom' },
      nxJson,
      overrides
    );
    expect(tasksRunner).toBe(mockRunner);
    expect(tasksOptions).toEqual({
      runnerOption: 'runner-option',
      foo: 'bar',
    });
  });

  it('gets a custom defined default task runner', async () => {
    jest.mock('custom-default-runner', () => mockRunner, {
      virtual: true,
    });

    nxJson.tasksRunnerOptions = {
      default: {
        runner: 'custom-default-runner',
      },
    };

    const { tasksRunner } = await getRunner({}, nxJson, overrides);

    expect(tasksRunner).toEqual(mockRunner);
  });
});
