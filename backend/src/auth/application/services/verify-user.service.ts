import { Injectable } from '@nestjs/common';
import {
  VerifyUserDto,
  VerifyUserResponse,
  VerifyUserUseCase,
} from '../port/in/verify-user.use-case';
import { PersistUserPort } from '../port/out/persist-user.port';
import { HashUseCase } from '../port/in/hash.use-case';

@Injectable()
export class VerifyUserService implements VerifyUserUseCase {
  constructor(
    private persistPort: PersistUserPort,
    private hashUseCase: HashUseCase,
  ) {}

  async verifyUser(dto: VerifyUserDto): Promise<VerifyUserResponse> {
    const response = await this.persistPort.getUser(dto.email);
    if (!response) return null;
    const { password, ...user } = response;
    const passwordMatch = await this.hashUseCase.compare(
      dto.password,
      password,
    );
    if (!!user && passwordMatch) {
      return user;
    }
    return null;
  }
}
