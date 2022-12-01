import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { FindProductDTO } from '../dto/find-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.insert(createProductDto);
    } catch (error) {
      if (error.code == 23505)
        throw new HttpException({ reason: error.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() query: FindProductDTO): Promise<ProductEntity[]> {
    try {
      return await this.productsService.findAll(query);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':category')
  async findByCategory(
    @Param('category') category: FindProductDTO,
  ): Promise<ProductEntity[]> {
    console.log(category);
    try {
      return await this.productsService.listCategory(category);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param() id: FindProductDTO,
    @Res() response: Response,
  ): Promise<ProductEntity> {
    try {
      const found = await this.productsService.findOne(id);
      if (found) {
        response.status(HttpStatus.OK).send(found);
        return found;
      }
      response
        .status(HttpStatus.OK)
        .send(`Nenhum produto encontrado com o ID ${id}`);
    } catch (error) {
      throw new HttpException(
        {
          reason: error.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
