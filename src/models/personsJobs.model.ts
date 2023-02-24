import { Field, Int, ObjectType } from '@nestjs/graphql';

import type { PersonsJobs as PersonsJobsType } from '@prisma/client';
import { Job } from './job.model';
import { Person } from './person.model';

@ObjectType()
export class PersonsJobs implements PersonsJobsType {
  @Field(() => Int)
  personId: number;
  @Field(() => Int)
  jobId: number;
  @Field()
  assignedAt: Date;
  @Field()
  assignedBy: string;
  @Field(() => Person)
  person: Person;
  @Field(() => Job)
  job: Job;
}
