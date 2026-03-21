import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  productId: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @CreateDateColumn()
  createdAt: Date;
}
