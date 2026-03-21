import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [OrdersModule, ProductsModule, UsersModule],
  controllers: [AdminController],
})
export class AdminModule {}
