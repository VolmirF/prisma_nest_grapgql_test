import { Job } from 'src/models/job.model';
import { Person } from 'src/models/person.model';

export abstract class PersonsRepository {
  abstract findAll({ selectParams }): Promise<Array<Partial<Person>>>;
  abstract create(
    person: Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'jobs'>,
  ): Promise<Omit<Person, 'jobs'>>;

  abstract assignJobToPerson(
    personId: Person['id'],
    jobId: Job['id'],
  ): Promise<Omit<Person, 'jobs'>>;
}
