import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const user = await this.usersService.create({ email, password, name });
    const { password: _, ...result } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: result, access_token: token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...result } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: result, access_token: token };
  }
}
