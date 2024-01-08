import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Role,
  Roles,
} from 'src/auth/infraestructure/controller/guards/roles.decorator';
import { ApplicationDto } from './dto/application.dto';
import { Request } from 'express';
import { withUser } from 'src/common/infraestructure/controller/with-user';
import { CreateApplicationUseCase } from 'src/core/application/port/in/create-application.use-case';

@Controller('')
export class ApplicationController {
  constructor(private createApplicationUseCase: CreateApplicationUseCase) {}

  @Post('project/:projectId/application')
  @UsePipes(new ValidationPipe())
  @Roles(Role.Provider)
  create(
    @Body() dto: ApplicationDto,
    @Req() req: Request,
    @Param('projectId') projectId: string,
  ) {
    const user = withUser(req);
    return this.createApplicationUseCase.createApplication({
      ...dto,
      providerId: user.id,
      projectId: projectId,
    });
  }
}
