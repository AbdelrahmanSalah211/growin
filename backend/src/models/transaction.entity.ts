import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { User, Course, InstructorPayout } from './index';
@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transactionId: string;

  @Column()
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentStatus: string;

  @ManyToOne(() => User, (user) => user.payouts)
  instructor: User;

  @ManyToOne(() => Course, (course) => course.payouts)
  course: Course;

  @ManyToOne(() => InstructorPayout, (payout) => payout.transactions)
  payout: InstructorPayout;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
