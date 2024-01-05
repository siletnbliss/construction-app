import { Injectable } from '@nestjs/common';
import { CreateUserDto, PersistUserPort } from '../port/out/persist-user.port';
import { RegisterUserUseCase } from '../port/in/register-user.use-case';

@Injectable()
export class RegisterUserService implements RegisterUserUseCase {
  constructor(private persistPort: PersistUserPort) {}

  async register(dto: CreateUserDto) {
    // TODO: encrypt password before save
    await this.persistPort.createUser(dto);
  }
}
