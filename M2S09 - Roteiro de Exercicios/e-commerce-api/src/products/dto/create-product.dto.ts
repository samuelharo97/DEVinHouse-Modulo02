import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { categoryEnum } from 'src/utils/products.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum(categoryEnum)
  readonly category: categoryEnum;

  @IsNumber()
  readonly value: number;

  @IsBoolean()
  readonly available: boolean;
}
