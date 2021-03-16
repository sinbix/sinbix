import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import {
  IPost,
  IPostCreateInput,
  IPostUpdateInput,
  IPostWhereUniqueInput,
  IPostUpdateArgs,
} from '@sinbix/demo/apps/shared/utils';

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
export class PostUpdateArgs implements IPostUpdateArgs {
  @Field()
  data: PostUpdateInput;

  @Field()
  where: PostWhereUniqueInput;
}
