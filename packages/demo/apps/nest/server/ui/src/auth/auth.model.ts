import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import {
  IAuthToken,
  ISigninInput,
  ISignupInput,
  IUser,
  IUserProfile,
} from '@sinbix/demo/apps/shared/utils';

@ObjectType()
export class UserProfile implements IUserProfile {
  user: IUser;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

@ObjectType()
export class User implements IUser {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => UserProfile)
  profile: UserProfile;
}

@ObjectType()
export class AuthToken implements IAuthToken {
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
