import {
  ArrayNotEmpty,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectItemDto } from './project-item.dto';
import { Type } from 'class-transformer';

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

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ProjectItemDto)
  items: ProjectItemDto[];
}
