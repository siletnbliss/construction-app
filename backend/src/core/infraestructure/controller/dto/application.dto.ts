import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsOptional()
  @IsPositive()
  unitPrice?: number;
}

export class ApplicationDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ItemDto)
  items: ItemDto[];
}
