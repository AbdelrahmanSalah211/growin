import {
  Entity,
  PrimaryColumn, 
  Column,
  ManyToOne,
} from "typeorm";

import {
  User,
  Course,
} from './index';

@Entity('review')
export class Review {
  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  studentId: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column()
  helpful: boolean;

  @ManyToOne(() => Course, (course) => course.reviews)
  course: Course;

  @ManyToOne(() => User, (user) => user.reviews)
  student: User;
}
