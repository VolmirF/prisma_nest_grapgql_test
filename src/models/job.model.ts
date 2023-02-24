import { Field, Int, ObjectType } from '@nestjs/graphql';

import type { Job as JobType } from '@prisma/client';

@ObjectType()
export class Job implements JobType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
