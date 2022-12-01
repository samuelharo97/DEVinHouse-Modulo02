import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './controllers/products.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { productsProviders } from './products.providers';

@Module({
  controllers: [ProductsController],
  providers: [...databaseProviders, ...productsProviders, ProductsService],
})
export class ProductsModule {}
