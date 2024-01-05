import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegisterUserService } from './application/services/register-user.service';
import { RegisterUserUseCase } from './application/port/in/register-user.use-case';
import {
  User,
  UserSchema,
} from './infraestructure/persistence/schemas/user.schema';
import { PersistUserPort } from './application/port/out/persist-user.port';
import { UserRepository } from './infraestructure/persistence/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: PersistUserPort,
      useClass: UserRepository,
    },
    { provide: RegisterUserUseCase, useClass: RegisterUserService },
  ],
  controllers: [],
})
export class AuthModule {}
