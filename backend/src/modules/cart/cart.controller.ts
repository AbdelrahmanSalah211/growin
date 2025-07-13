import { Controller, Get, Post, Body, Req, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/roles.decorator';
import { UserMode } from 'src/models';
import { RolesGuard } from '../authorization/roles.guard';
import { addCourseToCartDto, removeCourseFromCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async addCourseToCart(
    @Req() req: { user: { sub: number } },
    @Body() dto: addCourseToCartDto,
  ) {
    return this.cartService.addCourseToCart(req.user.sub, dto.courseId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserMode.LEARNER)
  async getCart(
    @Req() req: { user: { sub: number } },
  ) {
    return this.cartService.getCart(req.user.sub);
  }

  @Post('remove-course')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async removeCourseFromCart(
    @Req() req: { user: { sub: number } },
    @Body() dto: removeCourseFromCartDto,
  ) {
    return this.cartService.removeCourseFromCart(req.user.sub, dto.courseId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async clearCart(
    @Req() req: { user: { sub: number } },
  ) {
    return this.cartService.clearCart(req.user.sub);
  }
}
