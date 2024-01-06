import { Request } from 'express';
import { LoginUserDto } from 'src/auth/application/port/in/login-user.use-case';

export function withUser(req: Request) {
  return req.user as LoginUserDto;
}
