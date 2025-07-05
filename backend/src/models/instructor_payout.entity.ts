import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';
import { Course } from './course.entity';

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

export default InstructorPayout;
