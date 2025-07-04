import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Review } from './review.entity';
import { Enrollment } from './enrollment.entity';
import { CourseCategory } from './courses-category.entity';

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

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
  
  @ManyToOne(() => CourseCategory, (category) => category.courses, { onDelete: 'SET NULL' })
  
  @JoinColumn({ name: 'categoryId' })
  category: CourseCategory;

  @Column({ nullable: true })
  categoryId: number;

}

export default Course;