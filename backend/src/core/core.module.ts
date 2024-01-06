import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Project,
  ProjectSchema,
} from './infraestructure/persistence/schemas/project.schema';
import { CreateProjectUseCase } from './application/port/in/create-project.use-case';
import { CreateProjectService } from './application/services/create-project.service';
import { ProjectController } from './infraestructure/controller/project.controller';
import { PersistProjectPort } from './application/port/out/persist-project.port';
import { PersistProjectAdapter } from './infraestructure/persistence/persist-project.adapter';
import { ProjectRepository } from './infraestructure/persistence/project.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [
    { provide: CreateProjectUseCase, useClass: CreateProjectService },
    { provide: PersistProjectPort, useClass: PersistProjectAdapter },
    ProjectRepository,
  ],
  controllers: [ProjectController],
})
export class CoreModule {}
