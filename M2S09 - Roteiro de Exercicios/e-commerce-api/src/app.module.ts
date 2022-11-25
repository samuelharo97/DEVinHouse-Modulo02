import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [CartModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
