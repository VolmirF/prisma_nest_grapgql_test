import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Job } from 'src/models/job.model';
import { JobsRepository } from '../jobs-repository';

@Injectable()
export class PrismaJobsRepository implements JobsRepository {
  constructor(private prisma: PrismaService) {}

  findAll(filters?: { personId?: number | number[] }): Promise<Job[]> {
    return this.prisma.job.findMany({
      where: {
        persons:
          filters && filters.personId
            ? {
                some: {
                  personId: Array.isArray(filters?.personId)
                    ? { in: filters?.personId }
                    : filters.personId,
                },
              }
            : undefined,
      },
    });
  }

  async create(job: Job): Promise<Job> {
    return this.prisma.job.create({ data: { name: job.name } });
  }
}
