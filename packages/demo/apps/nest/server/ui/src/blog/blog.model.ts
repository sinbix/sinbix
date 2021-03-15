import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';
import { ID } from '@datorama/akita';
import {
  IComment,
  IPost,
  IPostCreateInput,
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

  // @Field()
  comments: IComment[];
}

export class PostCreateInput implements IPostCreateInput {
  authorId: ID;
  title: string;
  content: string;
}
