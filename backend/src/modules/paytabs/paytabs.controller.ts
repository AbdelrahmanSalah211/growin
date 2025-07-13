import { Controller, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/roles.decorator';
import { User, Course, UserMode } from 'src/models';
import { RolesGuard } from '../authorization/roles.guard';
import { CartService } from '../cart/cart.service';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaytabsService } from './paytabs.service';


@Controller('checkout')
export class PaytabsController {
  constructor(
    private readonly cartService: CartService,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paytabsService: PaytabsService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async checkout(
    @Req() req: { user: { sub: number, email: string, userMode: UserMode } },
  ) {
    return this.paytabsService.createPaymentPage(req.user.sub);
  }
}