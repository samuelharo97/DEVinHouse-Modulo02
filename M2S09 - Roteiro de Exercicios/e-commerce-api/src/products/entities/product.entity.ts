import { CartEntity } from 'src/cart/entities/cart.entity';
import { categoryEnum } from 'src/utils/products.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => CartEntity, (orders) => orders.products, {
    cascade: true,
  })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('float')
  value: number;

  @Column({ length: 255 })
  description: string;

  @Column({ default: true })
  available: boolean;

  @Column('int')
  category: categoryEnum;
}
