import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import {
  IPostComment,
  IPost,
  IPostCreateInput,
  IPostUpdateInput,
  IPostWhereUniqueInput,
  IPostUpdateArgs,
  IPostCommentCreateInput,
  IPostCommentCreateArgs,
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

  @Field((type) => [PostComment], { nullable: true })
  comments: PostComment[];
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

@ObjectType()
export class PostComment implements IPostComment {
  @Field()
  authorId: number;

  @Field()
  content: string;
}

@InputType()
export class PostCommentCreateInput implements IPostCommentCreateInput {
  @Field()
  authorId: number;

  @Field()
  content: string;
}

@ArgsType()
export class PostCommentCreateArgs implements IPostCommentCreateArgs {
  @Field()
  data: PostCommentCreateInput;

  @Field()
  where: PostWhereUniqueInput;
}
