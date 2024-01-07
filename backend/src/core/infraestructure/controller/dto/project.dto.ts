import {
  ArrayNotEmpty,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectItemDto } from './project-item.dto';
import { Transform, Type } from 'class-transformer';
import { CreateProjectItemUseCaseDto } from 'src/core/application/port/in/create-project.use-case';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  finishDate: string;

  published: boolean;

  @Type(() => String)
  @ArrayNotEmpty({})
  @ValidateNested({})
  @Transform(
    ({ value }) => {
      try {
        const parsed: CreateProjectItemUseCaseDto[] = JSON.parse(value);
        return parsed;
      } catch {
        return value;
      }
    },
    { toClassOnly: true },
  )
  @Type(() => ProjectItemDto)
  items: ProjectItemDto[];
}
