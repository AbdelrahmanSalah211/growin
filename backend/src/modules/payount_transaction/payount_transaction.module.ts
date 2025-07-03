import { Module } from '@nestjs/common';
import { PayountTransactionService } from './payount_transaction.service';
import { PayountTransactionController } from './payount_transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorPayout } from '../../models/instructor_payout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstructorPayout])],
  controllers: [PayountTransactionController],
  providers: [PayountTransactionService],
})
export class PayountTransactionModule {}
