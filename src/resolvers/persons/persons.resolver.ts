import { Resolver, Query, Info, Mutation, Args } from '@nestjs/graphql';

import { Person } from 'src/models/person.model';
import { PersonsRepository } from 'src/repositories/persons-repository';

import { CreatePersonInput } from './persons.input';
import { mapInfo } from 'src/common/mapInfo';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private personsRepository: PersonsRepository) {}

  @Query(() => [Person], { nullable: true })
  async allPersons(@Info() info) {
    return this.personsRepository.findAll({
      selectParams: mapInfo(info),
    });
  }

  // Avoid n+1 problem with JOIN queries
  // DataLoader

  // @ResolveField('jobs', (returns) => [Job])
  // async getJob(@Parent() person: Person) {
  //   const { id } = person;
  //   return this.jobsRepository.findAll({ personId: id });
  // }

  @Mutation(() => Person)
  async createPerson(@Args('person') person: CreatePersonInput) {
    return this.personsRepository.create(person);
  }

  @Mutation(() => Person)
  async assignJobToPerson(
    @Args('personId') personId: number,
    @Args('jobId') jobId: number,
  ) {
    return this.personsRepository.assignJobToPerson(personId, jobId);
  }
}
