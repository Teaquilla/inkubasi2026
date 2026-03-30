import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { OrderStatus } from './order.entity';

// 1. IMPORT SENSOR PROMETHEUS
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    // 2. MASUKKAN SENSOR KE DALAM CONSTRUCTOR
    @InjectMetric('order_created_total') public orderCounter: Counter<string>
  ) {}

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
    // 3. PEMICU SENSOR: Tambah 1 setiap kali ada pesanan dibuat!
    this.orderCounter.inc(); 
    
    return this.ordersService.createFromCart(req.user.id, body.shippingAddress, body.promoCode, body.notes);
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStatus(@Param('id') id: string, @Body() body: { status: OrderStatus }) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
