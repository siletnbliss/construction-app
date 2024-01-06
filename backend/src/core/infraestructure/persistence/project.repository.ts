import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectUseCaseDto } from 'src/core/application/port/in/create-project.use-case';
import { PersistProjectResponse } from 'src/core/application/port/out/persist-project.port';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}
  private map(project: ProjectDocument): PersistProjectResponse {
    const parsed = project.toJSON();
    return {
      ...parsed,
      id: parsed._id.toString(),
      ownerId: parsed.ownerId.toString(),
      startDate: project.startDate.toISOString(),
      finishDate: project.finishDate.toISOString(),
    };
  }
  async create(dto: CreateProjectUseCaseDto): Promise<PersistProjectResponse> {
    const project = await this.projectModel.create(dto);
    return this.map(project);
  }

  async findMany(ownerId?: string) {
    const result = await this.projectModel.find({ ownerId });
    return result.map((r) => this.map(r));
  }

  async findOne(id: string) {
    return this.map(await this.projectModel.findById(id));
  }
}
