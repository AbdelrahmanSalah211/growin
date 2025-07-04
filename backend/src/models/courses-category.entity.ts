import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('course_category')
export class CourseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
