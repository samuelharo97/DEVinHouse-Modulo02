import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Cart' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: () => "'1'" })
  userId: string;

  @Column('float')
  value: number;

  @Column('int', { array: true, default: {} })
  @ManyToOne(() => ProductEntity, (products) => products.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'products_in_cart',
  })
  products: ProductEntity[];
}
