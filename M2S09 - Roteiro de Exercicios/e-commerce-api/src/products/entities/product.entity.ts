import { categoryEnum } from 'src/utils/products.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('float')
  value: number;

  @Column({ length: 255 })
  description: string;

  @Column()
  available: boolean;

  @Column('int')
  category: categoryEnum;
}
