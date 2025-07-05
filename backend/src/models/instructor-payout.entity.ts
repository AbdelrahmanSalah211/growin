import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import {
  User,
  Course,
  Transaction,
} from './index';

@Entity('instructor_payouts')
export class InstructorPayout {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payouts)
  instructor: User;

  @ManyToOne(() => Course, (course) => course.payouts)
  course: Course;

  @OneToMany(() => Transaction, (transaction) => transaction.payout)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
