import { Module } from '@nestjs/common';
import { PaytabsService } from './paytabs.service';
import { PaytabsController } from './paytabs.controller';
import { Course, User } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User]), CartModule],
  providers: [PaytabsService],
  controllers: [PaytabsController],
  exports: [PaytabsService],
})
export class PaytabsModule {}
