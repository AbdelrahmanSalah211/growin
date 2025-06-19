import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

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

}

export default Course;