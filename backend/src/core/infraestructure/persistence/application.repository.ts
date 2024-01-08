import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Application } from './schemas/application.schema';
import { Supply } from './schemas/supply.schema';
import { CreateApplicationDto } from 'src/core/application/port/in/create-application.use-case';

type MapDto = Application & { _id: Types.ObjectId } & {
  items: (Supply & { _id: Types.ObjectId })[];
};

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
}
