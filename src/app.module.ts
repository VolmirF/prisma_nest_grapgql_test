import { join } from 'node:path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { PrismaService } from './database/prisma.service';

import { PersonsRepository } from './repositories/persons-repository';
import { PrismaPersonsRepository } from './repositories/prisma/prisma-persons-repository';
import { JobsRepository } from './repositories/jobs-repository';
import { PrismaJobsRepository } from './repositories/prisma/prisma-jobs-repository';

import { PersonsResolver } from './resolvers/persons/persons.resolver';
import { JobsResolver } from './resolvers/jobs/jobs.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: PersonsRepository,
      useClass: PrismaPersonsRepository,
    },
    {
      provide: JobsRepository,
      useClass: PrismaJobsRepository,
    },
    PersonsResolver,
    JobsResolver,
  ],
})
export class AppModule {}
