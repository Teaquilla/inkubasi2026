import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProductCategory {
  WOMEN = 'women',
  MEN = 'men',
  ACCESSORIES = 'accessories',
  SALE = 'sale',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  originalPrice: number;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column('simple-array', { nullable: true })
  sizes: string[];

  @Column('simple-array', { nullable: true })
  colors: string[];

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
