import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class CervejaService {
  public async saveData(data: object) {
    const content = JSON.parse(await readFile('beers.json', 'utf-8'));

    const updatedContent = [...content, data];

    writeFile('beers.json', updatedContent);

    return data;
  }
  public async loadData() {
    const content = JSON.parse(await readFile('beers.json', 'utf-8'));

    return content;
  }
}
