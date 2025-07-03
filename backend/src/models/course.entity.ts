import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Lesson } from './lesson.entity';
import InstructorPayout from './instructor_payout.entity';
import { Transaction } from './transaction.entity';

enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  description: string;

  @Column()
  isPublished: boolean;

  @Column()
  language: string;

  @Column()
  imageDeleteURL: string;

  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;

  @Column()
  price: number;

  @Column()
  ratingSum: number;

  @Column()
  numberOfReviewers: number;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
  @OneToMany(() => InstructorPayout, (payout) => payout.course, {
    onDelete: 'CASCADE',
  })
  payouts: InstructorPayout[];
  @OneToMany(() => Transaction, (transaction) => transaction.course, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Course;
