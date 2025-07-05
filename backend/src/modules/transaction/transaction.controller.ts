import { Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.transactionService.findOne(id);
  }

  @Post()
  create() {
    return this.transactionService.create();
  }
}
