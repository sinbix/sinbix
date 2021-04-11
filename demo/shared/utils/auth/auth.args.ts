import { ISafeUser } from '@sinbix/demo/shared/utils/user';

export interface ISigninInput {
  email: string;

  password: string;
}

export interface ISignupInput {
  email: string;

  password: string;

  firstName: string;

  lastName: string;
}

export interface IAuthInput {
  jwt?: string;
  user?: ISafeUser;
}

export interface ISigninArgs {
  data: ISigninInput;
}

export interface ISignupArgs {
  data: ISignupInput;
}

export interface IAuthArgs {
  _auth?: IAuthInput;
}
