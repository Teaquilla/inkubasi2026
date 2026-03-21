import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { OrderStatus } from './order.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  myOrders(@Request() req) {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get(':id')
  getOrder(@Request() req, @Param('id') id: string) {
    return this.ordersService.findById(id, req.user.id);
  }

  @Post()
  create(@Request() req, @Body() body: { shippingAddress: any; promoCode?: string; notes?: string }) {
    return this.ordersService.createFromCart(req.user.id, body.shippingAddress, body.promoCode, body.notes);
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStatus(@Param('id') id: string, @Body() body: { status: OrderStatus }) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
