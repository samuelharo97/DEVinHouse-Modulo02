import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { cartProviders } from './cart.providers';

@Module({
  controllers: [CartController],
  providers: [...databaseProviders, ...cartProviders, CartService],
})
export class CartModule {}
