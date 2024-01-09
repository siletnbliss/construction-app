import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Application } from './schemas/application.schema';
import { Supply } from './schemas/supply.schema';
import { CreateApplicationDto } from 'src/core/application/port/in/create-application.use-case';

type MapDto = Application & { _id: Types.ObjectId } & {
  items: (Supply & { _id: Types.ObjectId })[];
};

const BASE_LOOKUP = [
  {
    $lookup: {
      from: 'supplies',
      localField: '_id',
      foreignField: 'applicationId',
      as: 'items',
      pipeline: [
        {
          $lookup: {
            from: 'projectitems',
            localField: 'itemId',
            foreignField: '_id',
            as: 'projectItem',
          },
        },
        { $unwind: '$projectItem' },
      ],
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'providerId',
      foreignField: '_id',
      as: 'provider',
    },
  },

  { $unwind: '$provider' },
  {
    $project: {
      provider: { password: 0, context: 0 },
    },
  },
];

const PROJECT_LOOKUP = (projectId: string) => [
  {
    $match: {
      projectId: new Types.ObjectId(projectId),
    },
  },
];

const PROVIDER_LOOKUP = (providerId: string) => [
  {
    $match: {
      providerId: new Types.ObjectId(providerId),
    },
  },
  {
    $lookup: {
      from: 'projects',
      localField: 'projectId',
      foreignField: '_id',
      as: 'project',
    },
  },
  { $unwind: '$project' },
];

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Supply.name) private supplyModel: Model<Supply>,
  ) {}

  private map(dto: MapDto) {
    return {
      ...dto,
      id: dto._id.toString(),
      providerId: dto.providerId.toString(),
      projectId: dto.projectId.toString(),
      date: dto.date.toISOString(),
      items: dto.items.map((it) => ({
        ...it,
        id: it._id.toString(),
        itemId: it.itemId.toString(),
        applicationId: it.applicationId.toString(),
      })),
    };
  }

  async create(dto: CreateApplicationDto) {
    const session = await this.connection.startSession();
    const { items: itemsDto, ...applicationDto } = dto;
    const result = await session.withTransaction(async () => {
      const application = await this.applicationModel.create([applicationDto], {
        session,
      });
      const items = await this.supplyModel.create(
        itemsDto.map((item) => ({
          ...item,
          applicationId: application.at(0)._id,
        })),
        { session },
      );

      return {
        ...application.at(0).toJSON(),
        items: items.map((it) => it.toJSON()),
      };
    });
    return this.map(result);
  }

  async findMany(dto: { projectId: string; providerId: string }) {
    console.log({ projectId: dto.projectId });
    const lookup = dto.projectId
      ? PROJECT_LOOKUP(dto.projectId)
      : PROVIDER_LOOKUP(dto.providerId as string);
    const results = await this.applicationModel.aggregate([
      ...BASE_LOOKUP,
      ...lookup,
    ]);
    return results.map(this.map);
  }

  async findOne(dto: { projectId: string; providerId: string }) {
    const result = await this.applicationModel.aggregate([
      {
        $match: {
          projectId: new Types.ObjectId(dto.projectId),
          providerId: new Types.ObjectId(dto.providerId),
        },
      },
      ...BASE_LOOKUP,
      ...PROVIDER_LOOKUP(dto.providerId),
    ]);
    if (!result.length) return null;
    return this.map(result.at(0));
  }
}
