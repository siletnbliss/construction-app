import { UserContext } from 'src/auth/domain/models';

export interface LoginUserDto {
  email: string;
  context: UserContext;
  id: string;
}

export interface LoginUserResponse {
  token: string;
}

export abstract class LoginUserUseCase {
  abstract loginUser(dto: LoginUserDto): Promise<LoginUserResponse>;
}
