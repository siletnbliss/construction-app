import {
  Body,
  Controller,
  Get,
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
import { GetProviderApplicationsUseCase } from 'src/core/application/port/in/get-provider-applications.use-case';

@Controller('provider')
export class ApplicationController {
  constructor(
    private createApplicationUseCase: CreateApplicationUseCase,
    private getProviderApplicationsUseCase: GetProviderApplicationsUseCase,
  ) {}

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

  @Roles(Role.Provider)
  @Get('application')
  getApplications(@Req() req: Request) {
    const user = withUser(req);
    return this.getProviderApplicationsUseCase.getAllApplications(user.id);
  }

  @Roles(Role.Provider)
  @Get('project/:projectId/application')
  getProjectApplication(
    @Req() req: Request,
    @Param('projectId') projectId: string,
  ) {
    const user = withUser(req);
    return this.getProviderApplicationsUseCase.getApplication({
      projectId: projectId,
      providerId: user.id,
    });
  }
}
