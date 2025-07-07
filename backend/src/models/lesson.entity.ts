import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Course, LessonProgress } from './index';

export enum LessonType {
  VIDEO = 'video',
  DOCUMENT = 'document',
  QUIZ = 'quiz',
}

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  position: number;

  @Column()
  section: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({
    type: 'enum',
    enum: LessonType,
    default:LessonType.VIDEO
  })
  lessonType: LessonType;
  
  @Column({ nullable: true })
  fileURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Course, (course) => course.lessons, {
    // eager: true,
  })
  course: Course;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  progress: LessonProgress[];
}
