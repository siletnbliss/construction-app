import { Injectable } from '@nestjs/common';
import { CreateUserDto, PersistUserPort } from '../port/out/persist-user.port';
import { RegisterUserUseCase } from '../port/in/register-user.use-case';
import { HashUseCase } from '../port/in/hash.use-case';

@Injectable()
export class RegisterUserService implements RegisterUserUseCase {
  constructor(
    private persistPort: PersistUserPort,
    private hashUseCase: HashUseCase,
  ) {}

  async register(dto: CreateUserDto) {
    const encryptedPassword = await this.hashUseCase.hash(dto.password);
    await this.persistPort.createUser({ ...dto, password: encryptedPassword });
  }
}
