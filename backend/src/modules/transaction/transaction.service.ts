import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/models/transaction.entity';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findAll() {
    return this.transactionRepository.find();
  }

  create() {
    const newTransaction = new Transaction();
    return 'This action adds a new transaction';
  }
  findOne(id: number) {
    return this.transactionRepository.findOneBy({ id });
  }
}
