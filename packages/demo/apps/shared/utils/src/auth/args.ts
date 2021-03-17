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
export interface ISigninArgs {
  data: ISigninInput;
}

export interface ISignupArgs {
  data: ISignupInput;
}
