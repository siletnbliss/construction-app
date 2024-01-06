import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  GetUserDto,
  PersistUserPort,
} from '../../application/port/out/persist-user.port';
import { HashUseCase } from 'src/auth/application/port/in/hash.use-case';

const DEFAULT_USERS: CreateUserDto[] = [
  {
    name: 'Venezuela Constructions LLC',
    email: 'construction@email.com',
    password: '123456',
    context: 'constructor',
  },
  {
    name: 'Stone Group INC',
    email: 'provider1@email.com',
    password: '123456',
    context: 'provider',
  },
  {
    name: 'Diamond Group INC',
    email: 'provider2@email.com',
    password: '123456',
    context: 'provider',
  },
];

// connect to User schema to persist and retrieve data
@Injectable()
export class UserRepository implements PersistUserPort {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private hashUseCase: HashUseCase,
  ) {
    this.initUsers();
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    this.userModel.create(dto);
  }

  async getUser(email: string): Promise<GetUserDto | null> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) return null;
    return { ...user?.toObject(), id: user._id.toString() };
  }

  // for testing purposes, create users if database is empty
  private async initUsers() {
    const count = await this.userModel.countDocuments();
    if (count > 0) return;
    const users = await Promise.all(
      DEFAULT_USERS.map(async (u) => ({
        ...u,
        password: await this.hashUseCase.hash(u.password),
      })),
    );
    this.userModel.create(...users);
    console.log('Created initial users');
  }
}
