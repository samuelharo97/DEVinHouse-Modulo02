import { Controller, Get, Post } from '@nestjs/common';
import { Database } from './db/database';

@Controller('cerveja')
export class CervejaController {
  constructor(private persists: Database) {}
  @Get()
  public findAll() {
    const beers = this.persists.loadData;
    return beers;
  }
}
