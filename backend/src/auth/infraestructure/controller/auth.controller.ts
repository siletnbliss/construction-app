import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request as ExpressRequest } from 'express';
import {
  LoginUserDto,
  LoginUserUseCase,
} from 'src/auth/application/port/in/login-user.use-case';
import { Public } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUserUseCase) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.loginUseCase.loginUser(req.user as LoginUserDto);
  }

  @Get('me')
  getUser(@Request() req: ExpressRequest) {
    return req.user;
  }
}
