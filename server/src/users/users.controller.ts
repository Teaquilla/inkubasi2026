import { Controller, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req) {
    const { password, ...user } = req.user;
    return user;
  }

  @Patch('me')
  updateProfile(@Request() req, @Body() body: any) {
    return this.usersService.update(req.user.id, body);
  }
}
