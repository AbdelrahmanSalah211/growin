import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import {
  User,
  Course,
} from './index';
@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(/*{ unique: true }*/)
  transactionId: string;

  @Column()
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Course, (course) => course.transactions)
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
