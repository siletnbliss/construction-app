import { GetUserDto } from '../out/persist-user.port';

export interface VerifyUserDto {
  email: string;
  password: string;
}

export interface VerifyUserResponse extends Omit<GetUserDto, 'password'> {}

export abstract class VerifyUserUseCase {
  abstract verifyUser(dto: VerifyUserDto): Promise<VerifyUserResponse | null>;
}
