import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { Job } from 'src/models/job.model';
import { Person } from 'src/models/person.model';

import { PersonsRepository } from '../persons-repository';

@Injectable()
export class PrismaPersonsRepository implements PersonsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({ selectParams }): Promise<Partial<Person>[]> {
    return this.prisma.person.findMany({
      select: selectParams.select,
    });
  }

  async create(person: Person): Promise<Omit<Person, 'jobs'>> {
    return this.prisma.person.create({
      data: { name: person.name },
    });
  }

  async assignJobToPerson(
    personId: Person['id'],
    jobId: Job['id'],
  ): Promise<Omit<Person, 'jobs'>> {
    return this.prisma.person.update({
      where: { id: personId },
      data: {
        jobs: {
          deleteMany: { jobId, personId },
          createMany: { data: { jobId, assignedBy: 'Pessoa logada' } },
        },
      },
    });
  }
}
