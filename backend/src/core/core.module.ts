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
import { StorageModule } from 'src/storage/storage.module';
import {
  Application,
  ApplicationSchema,
} from './infraestructure/persistence/schemas/application.schema';
import {
  Supply,
  SupplySchema,
} from './infraestructure/persistence/schemas/supply.schema';
import { ApplicationController } from './infraestructure/controller/application.controller';
import { CreateApplicationUseCase } from './application/port/in/create-application.use-case';
import { CreateApplicationService } from './application/services/create-application.service';
import { PersistApplicationPort } from './application/port/out/persist-application.port';
import { ApplicationRepository } from './infraestructure/persistence/application.repository';
import { PersistApplicationAdapter } from './infraestructure/persistence/persist-application.adapter';
import { GetProviderApplicationsUseCase } from './application/port/in/get-provider-applications.use-case';
import { GetProviderApplicationsService } from './application/services/get-provider-applications.service';
import { RetrieveApplicationsPort } from './application/port/out/retrieve-applications.port';
import { RetrieveApplicationsAdapter } from './infraestructure/persistence/retrieve-applications.adapter';
import { GetProjectApplicationsUseCase } from './application/port/in/get-project-applications.use-case';
import { GetProjectApplicationsService } from './application/services/get-project-applications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectItem.name, schema: ProjectItemSchema },
      { name: Application.name, schema: ApplicationSchema },
      { name: Supply.name, schema: SupplySchema },
    ]),
    StorageModule,
  ],
  providers: [
    // projects
    { provide: CreateProjectUseCase, useClass: CreateProjectService },
    { provide: PersistProjectPort, useClass: PersistProjectAdapter },
    { provide: GetProjectsUseCase, useClass: GetProjectsService },
    { provide: GetProjectsByOwnerUseCase, useClass: GetProjectsByOwnerService },
    { provide: RetrieveProjectsPort, useClass: RetrieveProjectsAdapter },
    ProjectRepository,
    // applications
    { provide: CreateApplicationUseCase, useClass: CreateApplicationService },
    { provide: PersistApplicationPort, useClass: PersistApplicationAdapter },
    {
      provide: GetProviderApplicationsUseCase,
      useClass: GetProviderApplicationsService,
    },
    {
      provide: GetProjectApplicationsUseCase,
      useClass: GetProjectApplicationsService,
    },
    {
      provide: RetrieveApplicationsPort,
      useClass: RetrieveApplicationsAdapter,
    },

    ApplicationRepository,
  ],
  controllers: [ProjectController, ApplicationController],
})
export class CoreModule {}
