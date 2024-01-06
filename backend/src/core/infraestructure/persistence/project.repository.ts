import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectUseCaseDto } from 'src/core/application/port/in/create-project.use-case';
import { PersistProjectResponse } from 'src/core/application/port/out/persist-project.port';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(dto: CreateProjectUseCaseDto): Promise<PersistProjectResponse> {
    const project = (await this.projectModel.create(dto)).toObject();
    return {
      ...project,
      id: project._id.toString(),
      startDate: project.startDate.toISOString(),
      finishDate: project.finishDate.toISOString(),
    };
  }
}
