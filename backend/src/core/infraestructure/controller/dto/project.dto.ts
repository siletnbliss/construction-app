import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
}
