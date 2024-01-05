import { CreateUserDto } from '../out/persist-user.port';

export abstract class RegisterUserUseCase {
  abstract register(dto: CreateUserDto): Promise<void>;
}
