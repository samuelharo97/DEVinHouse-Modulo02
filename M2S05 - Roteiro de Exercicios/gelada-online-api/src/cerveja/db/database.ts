import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class Database {
  private FILENAME = 'beers.json';

  public async saveData(data: object) {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(this.FILENAME, updatedContent);

    return data;
  }
  public async loadData() {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    return content;
  }
}
