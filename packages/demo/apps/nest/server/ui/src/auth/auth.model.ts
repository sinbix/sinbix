import { ObjectType, Field, InputType, ArgsType, Int } from '@nestjs/graphql';
import type {
  IAuthResponse,
  ISafeUser,
  ISigninArgs,
  ISigninInput,
  ISignupArgs,
  ISignupInput,
} from '@sinbix/demo/apps/shared/types';
import { SafeUser } from './user';

@ObjectType()
export class AuthResponse implements IAuthResponse {
  @Field((type) => SafeUser)
  user: ISafeUser;

  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;
}

@InputType()
export class SigninInput implements ISigninInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SignupInput implements ISignupInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ArgsType()
export class SigninArgs implements ISigninArgs {
  @Field()
  data: SigninInput;
}

@ArgsType()
export class SignupArgs implements ISignupArgs {
  @Field()
  data: SignupInput;
}
