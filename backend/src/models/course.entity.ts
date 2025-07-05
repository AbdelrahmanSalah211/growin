import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import {
  Lesson,
  Review,
  Enrollment,
  CourseCategory,
  Transaction,
  InstructorPayout,
} from './index';

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

  @Column()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @ManyToOne(() => CourseCategory, (category) => category.courses, { onDelete: 'SET NULL' })
  courseCategory: CourseCategory;

  @OneToMany(() => InstructorPayout, (payout) => payout.course)
  payouts: InstructorPayout[];

  @OneToMany(() => Transaction, (transaction) => transaction.course)
  transactions: Transaction[];

}
