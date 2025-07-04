import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { 
  Course
} from './index';

@Entity('course_category')
export class CourseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @OneToMany(() => Course, (course) => course.courseCategory)
  courses: Course[];
}
