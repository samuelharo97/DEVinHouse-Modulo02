import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Beer } from '../cerveja.entity';

@Injectable()
export class Database {
  private FILENAME = 'beers.json';

  public async saveData(data: Beer) {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(this.FILENAME, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData() {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    return content;
  }

  public async rewriteData(data: Beer[]) {
    await writeFile(this.FILENAME, JSON.stringify(data));
  }
}
