import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  GetUserDto,
  PersistUserPort,
} from '../../application/port/out/persist-user.port';
// connect to User schema to persist and retrieve data
@Injectable()
export class UserRepository implements PersistUserPort {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto): Promise<void> {
    this.userModel.create(dto);
  }

  async getUser(id: string): Promise<GetUserDto | null> {
    return this.userModel.findById(id);
  }
}
