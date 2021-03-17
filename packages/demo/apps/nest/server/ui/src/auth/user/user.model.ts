import { ObjectType, Field, ArgsType, InputType } from '@nestjs/graphql';
import {
  IUser,
  IUserDeleteArgs,
  IUserProfile,
  IUserWhereUniqueInput,
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

@InputType()
export class UserWhereUniqueInput implements IUserWhereUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@ArgsType()
export class UserDeleteArgs implements IUserDeleteArgs {
  @Field()
  where: UserWhereUniqueInput;
}
