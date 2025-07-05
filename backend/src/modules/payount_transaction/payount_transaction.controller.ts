import { Controller, Get, Post } from '@nestjs/common';
import { PayountTransactionService } from './payount_transaction.service';

@Controller('payount-transaction')
export class PayountTransactionController {
  constructor(
    private readonly payountTransactionService: PayountTransactionService,
  ) {}

  @Get()
  findAll() {
    return this.payountTransactionService.findAll();
  }

  @Post()
  create() {
    return 'This action adds a new payount transaction';
  }

  @Get(':id')
  findOne(id: number) {
    return this.payountTransactionService.findOne(id);
  }
}
