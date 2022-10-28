import { IsString, Contains } from 'class-validator';

export class Beer {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  factory_name: string;

  @Contains('Ipa' || 'Lager' || 'Weizen' || 'Pilsen')
  category: string;
}
