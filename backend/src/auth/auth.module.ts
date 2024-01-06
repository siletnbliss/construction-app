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
import { HashUseCase } from './application/port/in/hash.use-case';
import { HashService } from './application/services/hash.service';
import { VerifyUserUseCase } from './application/port/in/verify-user.use-case';
import { VerifyUserService } from './application/services/verify-user.service';
import { LocalStrategy } from './infraestructure/passport/local.strategy';
import { AuthController } from './infraestructure/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from 'src/common/application/services/env.service';
import { LoginUserUseCase } from './application/port/in/login-user.use-case';
import { LoginUserService } from './application/services/login-user.service';
import { JwtStrategy } from './infraestructure/passport/jwt.strategy';
import { JwtAuthGuard } from './infraestructure/controller/guards/jwt-auth.guard';
import { RolesGuard } from './infraestructure/controller/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.get('TOKEN_SECRET'),
        signOptions: { expiresIn: envService.get('TOKEN_EXPIRE') },
      }),
    }),
  ],
  providers: [
    {
      provide: PersistUserPort,
      useClass: UserRepository,
    },
    { provide: RegisterUserUseCase, useClass: RegisterUserService },
    { provide: HashUseCase, useClass: HashService },
    { provide: VerifyUserUseCase, useClass: VerifyUserService },
    { provide: LoginUserUseCase, useClass: LoginUserService },
    LocalStrategy,
    JwtStrategy,
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
