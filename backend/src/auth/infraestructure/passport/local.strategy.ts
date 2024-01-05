import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  VerifyUserResponse,
  VerifyUserUseCase,
} from 'src/auth/application/port/in/verify-user.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<VerifyUserResponse> {
    const user = await this.verifyUserUseCase.verifyUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
