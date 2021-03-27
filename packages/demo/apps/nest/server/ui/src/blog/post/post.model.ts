import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import {
  IPost,
  IPostCreateInput,
  IPostUpdateInput,
  IPostWhereUniqueInput,
  IPostUpdateArgs,
  IPostCreateArgs,
  IPostDeleteArgs,
} from '@sinbix/demo/apps/shared/types';

@ObjectType()
export class Post implements IPost {
  @Field()
  id: string;

  @Field()
  authorId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}

@InputType()
export class PostCreateInput implements IPostCreateInput {
  @Field()
  authorId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}

@InputType()
export class PostUpdateInput implements IPostUpdateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;
}

@InputType()
export class PostWhereUniqueInput implements IPostWhereUniqueInput {
  @Field()
  id: string;
}

@ArgsType()
export class PostCreateArgs implements IPostCreateArgs {
  @Field()
  data: PostCreateInput;
}

@ArgsType()
export class PostUpdateArgs implements IPostUpdateArgs {
  @Field()
  data: PostUpdateInput;

  @Field()
  where: PostWhereUniqueInput;
}

@ArgsType()
export class PostDeleteArgs implements IPostDeleteArgs {
  @Field()
  where: PostWhereUniqueInput;
}
