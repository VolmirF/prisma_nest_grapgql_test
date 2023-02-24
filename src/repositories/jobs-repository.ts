import { Job } from 'src/models/job.model';

export abstract class JobsRepository {
  abstract findAll(filters?: {
    personId?: number | number[];
  }): Promise<Array<Job>>;
  abstract create(
    person: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Job>;
}
