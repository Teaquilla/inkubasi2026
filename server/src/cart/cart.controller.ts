import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// 1. IMPORT SENSOR PROMETHEUS
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private cartService: CartService,
    // 2. MASUKKAN SENSOR KE DALAM CONSTRUCTOR
    @InjectMetric('cart_items_added_total') public cartCounter: Counter<string>
  ) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  addItem(@Request() req, @Body() body: { productId: string; quantity: number; size?: string; color?: string }) {
    // 3. PEMICU SENSOR: Tambah sesuai jumlah barang (quantity) yang dimasukkan!
    this.cartCounter.inc(body.quantity); 
    
    return this.cartService.addItem(req.user.id, body.productId, body.quantity, body.size, body.color);
  }

  @Put(':id')
  updateItem(@Request() req, @Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(req.user.id, id, body.quantity);
  }

  @Delete(':id')
  removeItem(@Request() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.id, id);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
