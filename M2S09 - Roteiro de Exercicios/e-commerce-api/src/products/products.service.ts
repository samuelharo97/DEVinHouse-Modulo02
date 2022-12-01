import { Injectable, Inject } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDTO } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) {}

  passILike(obj) {
    const aux = { ...obj };
    Object.keys(obj).forEach((key, index) => {
      aux[key] = ILike(`%${obj[key]}%`);
    });
    console.log('-- aux --');
    console.log(aux);
    return aux;
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query?): Promise<ProductEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (query) {
          resolve(
            await this.productRepository.find({
              where: this.passILike(query),
            }),
          );
        }

        resolve(await this.productRepository.find());
      } catch (error) {
        reject(error);
      }
    });
  }

  async findOne(id: FindProductDTO): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.productRepository.findOneBy(id));
      } catch (error) {
        reject(error);
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
