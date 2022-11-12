import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Beer } from './cerveja.entity';
import { Database } from './db/database';

@Injectable()
export class CervejaService {
  constructor(private database: Database) {}

  public async createBeer(beer: Beer) {
    const beerExists = await this.getBeer(beer.name);
    if (beerExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Beer already exists',
      });
    }
    await this.database.saveData(beer);
    return beer;
  }

  public async getBeer(name: string) {
    const beerExists = await this.database.loadData();
    return beerExists.find(
      (data: Beer) => data.name.toLowerCase() === name.toLowerCase(),
    );
  }
  public async findOne(name: string) {
    const beer = await this.getBeer(name);

    return beer;
  }

  public async findAll() {
    const beers = await this.database.loadData();

    return beers;
  }

  public async update(name: string, body: Beer) {
    const beerExists = await this.getBeer(name);

    if (!beerExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const beers = await this.database.loadData();

    const updatedBeers = beers.map((beer: Beer) => {
      if (beer.name == name) {
        beer.name = body.name || beer.name;
        beer.category = body.category || beer.category;
        beer.description = body.description || beer.description;
        beer.factory_name = body.factory_name || beer.factory_name;
      }
      return beer;
    });

    this.database.rewriteData(updatedBeers);

    const beer = updatedBeers.find((beer: Beer) => beer.name == body.name);

    return beer;
  }

  public async destroy(name: string) {
    const beerExists = await this.getBeer(name);

    if (!beerExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const beers = await this.database.loadData();

    const updatedList = beers.filter((beer: Beer) => beer.name !== name);

    this.database.rewriteData(updatedList);

    return;
  }
}
