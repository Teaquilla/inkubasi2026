import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  @Get('dashboard')
  async getDashboard() {
    const [revenue, orderCount, productCount, customerCount] = await Promise.all([
      this.ordersService.getRevenueStats(),
      this.ordersService.count(),
      this.productsService.count(),
      this.usersService.count(),
    ]);
    return { revenue, orderCount, productCount, customerCount };
  }

  @Get('orders')
  getAllOrders(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.ordersService.findAll(+page, +limit);
  }

  @Get('customers')
  getAllCustomers() {
    return this.usersService.findAll();
  }
}
