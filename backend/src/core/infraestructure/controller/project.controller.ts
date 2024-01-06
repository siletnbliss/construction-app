import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  Role,
  Roles,
} from 'src/auth/infraestructure/controller/guards/roles.decorator';
import { CreateProjectUseCase } from 'src/core/application/port/in/create-project.use-case';
import { CreateProjectDto } from './dto/project.dto';
import { Request } from 'express';
import { LoginUserDto } from 'src/auth/application/port/in/login-user.use-case';

@Controller('project')
export class ProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {}

  @Roles(Role.Constructor)
  @Post('')
  create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const user = req.user as LoginUserDto;
    return this.createProjectUseCase.createProject({
      ...dto,
      ownerId: user.id,
    });
  }
}
