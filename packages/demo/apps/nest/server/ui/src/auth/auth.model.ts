import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import {
  IAuthToken,
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

// @InputType()
// export class PostCreateInput implements IPostCreateInput {
//   @Field()
//   authorId: number;

//   @Field()
//   title: string;

//   @Field()
//   content: string;
// }

// @InputType()
// export class PostUpdateInput implements IPostUpdateInput {
//   @Field({ nullable: true })
//   title: string;

//   @Field({ nullable: true })
//   content: string;
// }

// @InputType()
// export class PostWhereUniqueInput implements IPostWhereUniqueInput {
//   @Field()
//   id: string;
// }

// @ArgsType()
// export class PostUpdateArgs implements IPostUpdateArgs {
//   @Field()
//   data: PostUpdateInput;

//   @Field()
//   where: PostWhereUniqueInput;
// }
