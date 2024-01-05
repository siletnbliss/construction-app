import { UserContext } from '../../../domain/models';

export interface CreateUserDto {
  name: string;
  password: string;
  email: string;
  context: UserContext;
}

export interface GetUserDto extends CreateUserDto {
  id: string;
}

export abstract class PersistUserPort {
  abstract createUser(dto: CreateUserDto): Promise<void>;
  abstract getUser(id: string): Promise<GetUserDto | null>;
}
