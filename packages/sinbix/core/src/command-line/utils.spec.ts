import { splitArgsIntoSinbixArgsAndOverrides, getAffectedConfig } from './utils';
import * as fileUtils from '../file-utils';
jest.mock('../file-utils');

describe('splitArgs', () => {
  beforeEach(() => {
    jest.spyOn(fileUtils, 'readSinbixJson').mockReturnThis();
  });
  it('should split nx specific arguments into nxArgs', () => {
    expect(
      splitArgsIntoSinbixArgsAndOverrides(
        {
          base: 'sha1',
          head: 'sha2',
          notNxArg: true,
          _: ['--override'],
          $0: '',
        },
        'affected'
      ).sinbixArgs
    ).toEqual({
      base: 'sha1',
      head: 'sha2',
      skipSinbixCache: false,
    });
  });

  it('should default to having a base of master', () => {
    expect(
      splitArgsIntoSinbixArgsAndOverrides(
        {
          notNxArg: true,
          _: ['--override'],
          $0: '',
        },
        'affected'
      ).sinbixArgs
    ).toEqual({
      base: 'master',
      skipSinbixCache: false,
    });
  });

  it('should return configured base branch from nx.json', () => {
    jest.spyOn(fileUtils, 'readSinbixJson').mockReturnValue({
      npmScope: 'testing',
      affected: {
        defaultBase: 'develop',
      },
      projects: {},
    });
    expect(
      splitArgsIntoSinbixArgsAndOverrides(
        {
          notNxArg: true,
          _: ['--override'],
          $0: '',
        },
        'affected'
      ).sinbixArgs
    ).toEqual({
      base: 'develop',
      skipSinbixCache: false,
    });
  });

  it('should return a default base branch if not configured in nx.json', () => {
    jest.spyOn(fileUtils, 'readSinbixJson').mockReturnValue({
      npmScope: 'testing',
      projects: {},
    });
    expect(
      splitArgsIntoSinbixArgsAndOverrides(
        {
          notNxArg: true,
          _: ['--override'],
          $0: '',
        },
        'affected'
      ).sinbixArgs
    ).toEqual({
      base: 'master',
      skipSinbixCache: false,
    });
  });

  it('should split non nx specific arguments into target args', () => {
    expect(
      splitArgsIntoSinbixArgsAndOverrides(
        {
          files: [''],
          notNxArg: true,
          _: ['--override'],
          $0: '',
        },
        'affected'
      ).overrides
    ).toEqual({
      notNxArg: true,
      override: true,
    });
  });

  it('should set base and head in the affected mode', () => {
    const { sinbixArgs, overrides } = splitArgsIntoSinbixArgsAndOverrides(
      {
        notNxArg: true,
        _: ['sha1', 'sha2', '--override'],
        $0: '',
      },
      'affected'
    );

    expect(sinbixArgs).toEqual({
      base: 'sha1',
      head: 'sha2',
      skipSinbixCache: false,
    });
    expect(overrides).toEqual({
      notNxArg: true,
      override: true,
    });
  });

  it('should not set base and head in the run-one mode', () => {
    const { sinbixArgs, overrides } = splitArgsIntoSinbixArgsAndOverrides(
      {
        notNxArg: true,
        _: ['--exclude=file'],
        $0: '',
      },
      'run-one'
    );

    expect(sinbixArgs).toEqual({
      skipSinbixCache: false,
    });
    expect(overrides).toEqual({
      notNxArg: true,
      exclude: 'file',
    });
  });
});

describe('getAffectedConfig', () => {
  it('should return defaults when affected is undefined in nx.json', () => {
    jest.spyOn(fileUtils, 'readSinbixJson').mockReturnThis();

    expect(getAffectedConfig().defaultBase).toEqual('master');
  });

  it('should return default base branch when its defined in nx.json', () => {
    jest.spyOn(fileUtils, 'readSinbixJson').mockReturnValue({
      npmScope: 'testing',
      affected: {
        defaultBase: 'testing',
      },
      projects: {},
    });

    expect(getAffectedConfig().defaultBase).toEqual('testing');
  });
});
