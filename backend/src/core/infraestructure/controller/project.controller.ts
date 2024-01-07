import {
  Body,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Role,
  Roles,
} from 'src/auth/infraestructure/controller/guards/roles.decorator';
import { CreateProjectUseCase } from 'src/core/application/port/in/create-project.use-case';
import { CreateProjectDto } from './dto/project.dto';
import { Request } from 'express';
import { GetProjectsUseCase } from 'src/core/application/port/in/get-projects.use-case';
import { GetProjectsByOwnerUseCase } from 'src/core/application/port/in/get-projects-by-owner.use-case';
import { withUser } from 'src/common/infraestructure/controller/with-user';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('project')
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private getProjectsUseCase: GetProjectsUseCase,
    private getProjectsByOwnerUserCase: GetProjectsByOwnerUseCase,
  ) {}

  @Roles(Role.Constructor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('')
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() dto: CreateProjectDto,
    @Req() req: Request,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /^image+\/[-\w.]+$/ }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const user = withUser(req);
    return this.createProjectUseCase.createProject({
      ...dto,
      ownerId: user.id,
      images: files,
    });
  }

  @Roles(Role.Constructor)
  @Get('')
  get(@Req() req: Request) {
    const user = withUser(req);
    return this.getProjectsByOwnerUserCase.getProjects(user.id);
  }

  @Roles(Role.Constructor)
  @Get('/:id')
  async getOne(@Req() req: Request, @Param('id') id: string) {
    const user = withUser(req);
    const project = await this.getProjectsUseCase.getOne(id);
    if (user.id !== project.ownerId) throw new ForbiddenException();
    return project;
  }
}
