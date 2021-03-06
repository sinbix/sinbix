import { ObjectType, Field, ArgsType, InputType, Int } from '@nestjs/graphql';
import {
  ISafeUser,
  IUser,
  IUserArgs,
  IUserCreateArgs,
  IUserCreateInput,
  IUserDeleteArgs,
  IUserProfile,
  IUserProfileCreateInput,
  IUserProfileUpdateInput,
  IUsersArgs,
  IUserUpdateArgs,
  IUserUpdateInput,
  IUserWhereUniqueInput,
} from '@sinbix/demo/shared/utils/user';

@ObjectType()
export class UserProfile implements IUserProfile {
  user: IUser;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType()
export class SafeUser implements ISafeUser {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field((type) => UserProfile)
  profile: UserProfile;
}

@InputType()
export class UserWhereUniqueInput implements IUserWhereUniqueInput {
  @Field((type) => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
export class UserProfileCreateInput implements IUserProfileCreateInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

@InputType()
export class UserProfileUpdateInput implements IUserProfileUpdateInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}

@InputType()
export class UserCreateInput implements IUserCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  profile: UserProfileCreateInput;
}

@InputType()
export class UserUpdateInput implements IUserUpdateInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  profile: UserProfileUpdateInput;
}

@ArgsType()
export class UsersArgs implements IUsersArgs {}

@ArgsType()
export class UserArgs implements IUserArgs {
  @Field()
  where: UserWhereUniqueInput;
}

@ArgsType()
export class UserCreateArgs implements IUserCreateArgs {
  @Field()
  data: UserCreateInput;
}

@ArgsType()
export class UserUpdateArgs implements IUserUpdateArgs {
  @Field()
  data: UserUpdateInput;
  @Field()
  where: UserWhereUniqueInput;
}

@ArgsType()
export class UserDeleteArgs implements IUserDeleteArgs {
  @Field()
  where: UserWhereUniqueInput;
}
