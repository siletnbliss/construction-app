import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from 'src/auth/application/services/login-user.service';
import { EnvService } from 'src/common/application/services/env.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('TOKEN_SECRET'),
    });
  }

  async validate(payload: UserPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      context: payload.context,
    };
  }
}
