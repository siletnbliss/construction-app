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
import { GetProjectsUseCase } from './application/port/in/get-projects.use-case';
import { GetProjectsService } from './application/services/get-projects.service';
import { GetProjectsByOwnerUseCase } from './application/port/in/get-projects-by-owner.use-case';
import { GetProjectsByOwnerService } from './application/services/get-projects-by-owner.service';
import { RetrieveProjectsPort } from './application/port/out/retrieve-projects.port';
import { RetrieveProjectsAdapter } from './infraestructure/persistence/retrieve-projects.adapter';
import {
  ProjectItem,
  ProjectItemSchema,
} from './infraestructure/persistence/schemas/project-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectItem.name, schema: ProjectItemSchema },
    ]),
  ],
  providers: [
    { provide: CreateProjectUseCase, useClass: CreateProjectService },
    { provide: PersistProjectPort, useClass: PersistProjectAdapter },
    { provide: GetProjectsUseCase, useClass: GetProjectsService },
    { provide: GetProjectsByOwnerUseCase, useClass: GetProjectsByOwnerService },
    { provide: RetrieveProjectsPort, useClass: RetrieveProjectsAdapter },
    ProjectRepository,
  ],
  controllers: [ProjectController],
})
export class CoreModule {}
