import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { CervejaModule } from './cerveja/cerveja.module';

async function bootstrap() {
  const app = await NestFactory.create(CervejaModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(CervejaModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
