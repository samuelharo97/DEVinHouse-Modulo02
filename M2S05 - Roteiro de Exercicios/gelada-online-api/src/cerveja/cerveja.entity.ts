import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { BeerType } from './beer-type.enum';

export class Beer {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  factory_name: string;

  @IsNotEmpty()
  @IsEnum(BeerType)
  category: BeerType;
}
