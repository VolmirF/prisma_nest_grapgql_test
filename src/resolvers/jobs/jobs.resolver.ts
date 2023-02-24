import { Resolver, Query, Info, Mutation, Args } from '@nestjs/graphql';

import { Job } from 'src/models/job.model';
import { JobsRepository } from 'src/repositories/jobs-repository';
import { CreateJobInput } from './jobs.input';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private jobsRepository: JobsRepository) {}

  @Query(() => [Job], { nullable: true })
  async allJobs(@Info() info) {
    return this.jobsRepository.findAll({});
  }

  @Mutation(() => Job)
  async createJob(@Args('job') job: CreateJobInput) {
    return this.jobsRepository.create(job);
  }
}
