import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [
    CartService,
    // KITA DAFTARKAN SENSORNYA LANGSUNG DI DALAM RUANGAN INI
    makeCounterProvider({
      name: 'cart_items_added_total',
      help: 'Total jumlah barang yang dimasukkan ke keranjang',
    }),
  ],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
