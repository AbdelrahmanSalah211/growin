import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';

import { User } from './user.entity';
import { Course } from './course.entity';
import InstructorPayout from './instructor_payout.entity';

@Entity('tranaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentMethod: string;
  @Column()
  amount: number;
  @Column()
  paymentStatus: string;
  @ManyToOne(() => User, (user) => user.payouts)
  instructor: User;

  @ManyToOne(() => Course, (course) => course.payouts)
  course: Course;
  @ManyToOne(() => InstructorPayout, (payout) => payout.transactions)
  payout: InstructorPayout;
  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
