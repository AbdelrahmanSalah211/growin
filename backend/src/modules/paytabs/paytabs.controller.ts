import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/roles.decorator';
import { User, Course, UserMode } from 'src/models';
import { RolesGuard } from '../authorization/roles.guard';
import { CartService } from '../cart/cart.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaytabsService } from './paytabs.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('checkout')
export class PaytabsController {
  constructor(
    private readonly cartService: CartService,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paytabsService: PaytabsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async checkout(
    @Req() req: { user: { sub: number, email: string, userMode: UserMode } },
  ) {
    return this.paytabsService.createPaymentPage(req.user.sub);
  }

  @Post('return')
  return(
    @Body() body: any,
    @Res() res: Response
  ) {
    const cartId = body.cart_id;
    const userId = parseInt(cartId.split(':')[1]);
    const payload = { sub: userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.redirect('http://localhost:5000/me/learning');
  }
}