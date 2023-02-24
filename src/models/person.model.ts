import { Field, Int, ObjectType } from '@nestjs/graphql';

import type { Person as PersonType } from '@prisma/client';
import { PersonsJobs } from './PersonsJobs.model';

@ObjectType()
export class Person implements PersonType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => [PersonsJobs])
  jobs: PersonsJobs[];
}
