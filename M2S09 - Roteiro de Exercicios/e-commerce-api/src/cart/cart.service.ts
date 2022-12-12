import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<CartEntity>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async findAll(): Promise<CartEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.cartRepository.find());
      } catch (error) {
        reject(error);
      }
    });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
