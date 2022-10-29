import { Module } from '@nestjs/common';
import { CervejaController } from './cerveja.controller';

@Module({ controllers: [CervejaController] })
export class CervejaModule {}
