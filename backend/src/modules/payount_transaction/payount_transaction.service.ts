import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import InstructorPayout from 'src/models/instructor_payout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayountTransactionService {
  constructor(
    @InjectRepository(InstructorPayout)
    private instructorPayoutRepository: Repository<InstructorPayout>,
  ) {}

  findAll() {
    return this.instructorPayoutRepository.find();
  }

  findOne(id: number) {
    return this.instructorPayoutRepository.findOneBy({ id });
  }
}
