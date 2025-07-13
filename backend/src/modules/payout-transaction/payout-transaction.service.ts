// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { InstructorPayout } from '../../models';

// @Injectable()
// export class PayoutTransactionService {
//   constructor(
//     @InjectRepository(InstructorPayout)
//     private instructorPayoutRepository: Repository<InstructorPayout>,
//   ) {}

//   findAll() {
//     return this.instructorPayoutRepository.find();
//   }

//   findOne(id: number) {
//     return this.instructorPayoutRepository.findOneBy({ id });
//   }
// }
