import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Beer } from './cerveja.entity';
import { CervejaService } from './cerveja.service';

@Controller('cerveja')
export class CervejaController {
  constructor(private service: CervejaService) {}

  @Post()
  public async createBeer(@Body() beer: Beer): Promise<NestResponse> {
    const createdBeer = await this.service.createBeer(beer);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `cervejas/${beer.name}` })
      .withBody(createdBeer)
      .build();
  }

  @Get()
  public async findAll() {
    const beers = await this.service.findAll();
    return beers;
  }

  @Get()
  public async findOne(@Param('name') name: string) {
    const beer = await this.service.findOne(name);
    return beer;
  }

  @Put()
  public async update(@Param('name') name: string, @Body() body: Beer) {
    const updatedBeer = await this.service.update(name, body);

    return updatedBeer;
  }

  @Delete()
  public async destroy(@Param('name') name: string) {
    await this.service.destroy(name);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withBody({
        message: 'Beer deleted successfully',
      })
      .build();
  }
}
