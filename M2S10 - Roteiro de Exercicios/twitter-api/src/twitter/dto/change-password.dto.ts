import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  current_password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  new_password: string;
}
