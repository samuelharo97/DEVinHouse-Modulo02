import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  readonly username: string;

  @IsBoolean()
  @IsOptional()
  readonly privateAccount: boolean;

  @IsString()
  @IsOptional()
  readonly bio?: string;
}
