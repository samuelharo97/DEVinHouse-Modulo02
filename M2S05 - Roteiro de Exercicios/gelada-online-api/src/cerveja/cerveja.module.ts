import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from 'src/core/http/transform-response-interceptor';
import { CervejaController } from './cerveja.controller';
import { CervejaService } from './cerveja.service';
import { Database } from './db/database';
@Module({
  controllers: [CervejaController],
  providers: [
    Database,
    CervejaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class CervejaModule {}
