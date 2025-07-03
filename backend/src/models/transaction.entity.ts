import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { Course } from './course.entity';

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

  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
