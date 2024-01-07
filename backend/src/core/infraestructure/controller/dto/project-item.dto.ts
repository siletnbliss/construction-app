import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ProjectItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;
}
