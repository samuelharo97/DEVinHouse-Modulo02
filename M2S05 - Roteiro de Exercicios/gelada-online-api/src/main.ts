import { NestFactory } from '@nestjs/core';
import { CervejaModule } from './cerveja/cerveja.module';

async function bootstrap() {
  const app = await NestFactory.create(CervejaModule);
  await app.listen(3000);
}
bootstrap();
