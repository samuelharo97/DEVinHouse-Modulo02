import { Injectable, Inject } from '@nestjs/common';
import { categoryEnum } from 'src/utils/products.enum';
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
    // monday
    const aux = { ...obj };
    Object.keys(obj).forEach((key, index) => {
      aux[key] = ILike(`%${obj[key]}%`);
    });
    console.log('-- aux --');
    console.log(aux);
    return aux;
  }

  async insert(product: CreateProductDto): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.insert({
          ...product,
          category: parseInt(categoryEnum[product.category]),
        });
        const { id } = response.generatedMaps[0];
        let created = new ProductEntity();
        created = { ...product, id: id };
        resolve(created);
      } catch (error) {
        console.log('insert error', error);
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async listCategory(body): Promise<ProductEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (body) {
          resolve(
            await this.productRepository.find({
              where: {
                category: parseInt(body),
              },
            }),
          );
        }
        resolve(await this.productRepository.find());
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(query?: FindProductDTO): Promise<ProductEntity[]> {
    console.log(query, 'query');
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
