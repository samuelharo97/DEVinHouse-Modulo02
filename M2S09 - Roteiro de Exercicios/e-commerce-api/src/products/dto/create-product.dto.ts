import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { categoryEnum } from 'src/utils/products.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  readonly category: categoryEnum;

  @IsNumber()
  readonly price: number;

  readonly stock: number;
}
