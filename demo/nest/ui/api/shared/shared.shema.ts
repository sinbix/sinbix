import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IBatchPayload } from '@sinbix/demo/shared/utils/shared';

@ObjectType()
export class BatchPayload implements IBatchPayload {
  @Field((type) => Int)
  count: number;
}
