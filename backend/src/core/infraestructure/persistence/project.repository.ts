import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Connection, FlattenMaps, Model, Types } from 'mongoose';
import {
  PersistProjectPortDto,
  PersistProjectResponse,
} from 'src/core/application/port/out/persist-project.port';
import { ProjectItem } from './schemas/project-item.schema';

interface MapDto extends FlattenMaps<Project & { _id: Types.ObjectId }> {
  items: (ProjectItem & { _id: Types.ObjectId })[];
}
// fetch project items and images
const LOOKUP = [
  {
    $lookup: {
      from: 'projectitems',
      localField: '_id',
      foreignField: 'projectId',
      as: 'items',
    },
  },
  {
    $lookup: {
      from: 'files',
      localField: 'images',
      foreignField: '_id',
      as: 'images',
    },
  },
];

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(ProjectItem.name) private itemModel: Model<ProjectItem>,
  ) {}
  private map(dto: MapDto): PersistProjectResponse {
    const { items, ...project } = dto;
    return {
      ...project,
      id: project._id.toString(),
      ownerId: project.ownerId.toString(),
      startDate: project.startDate.toISOString(),
      finishDate: project.finishDate.toISOString(),
      items: items.map((it) => ({
        ...it,
        id: it._id.toString(),
        projectId: it.projectId.toString(),
      })),
    };
  }

  async create(dto: PersistProjectPortDto): Promise<PersistProjectResponse> {
    const session = await this.connection.startSession();
    const { items: itemsDto, ...projectDto } = dto;
    const result = await session.withTransaction(async () => {
      const project = await this.projectModel.create([projectDto], { session });
      const items = await this.itemModel.create(
        itemsDto.map((item) => ({ ...item, projectId: project.at(0)._id })),
        { session },
      );

      return {
        ...project.at(0).toJSON(),
        items: items.map((it) => it.toJSON()),
      };
    });
    await session.endSession();
    return this.map(result);
  }

  async findMany(ownerId?: string) {
    let result: any[];
    if (ownerId) {
      result = await this.projectModel.aggregate([
        { $match: { ownerId: new Types.ObjectId(ownerId) } },
        ...LOOKUP,
      ]);
    } else {
      result = await this.projectModel.aggregate(LOOKUP);
    }
    return result.map((r) => this.map(r));
  }

  async findOne(id: string) {
    return this.map(
      (
        await this.projectModel.aggregate([
          { $match: { _id: new Types.ObjectId(id) } },
          ...LOOKUP,
        ])
      ).at(0),
    );
  }
}
