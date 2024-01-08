import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserDto,
  LoginUserResponse,
  LoginUserUseCase,
} from '../port/in/login-user.use-case';
import { UserContext } from 'src/auth/domain/models';

export interface UserPayload {
  email: string;
  sub: string;
  context: UserContext;
}

@Injectable()
export class LoginUserService implements LoginUserUseCase {
  constructor(private jwtService: JwtService) {}

  async loginUser(dto: LoginUserDto): Promise<LoginUserResponse> {
    const payload: UserPayload = {
      email: dto.email,
      sub: dto.id,
      context: dto.context,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user: {
        id: dto.id,
        context: dto.context,
        email: dto.email,
      },
    };
  }
}
