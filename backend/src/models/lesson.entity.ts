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

  @Column({ default: 'Lesson Section' })
  section: string;

  @Column({ default: 'Lesson Subtitle' })
  subTitle: string;

  @Column({
    type: 'enum',
    enum: LessonType,
    default: LessonType.VIDEO,
  })
  lessonType: LessonType;

  @Column({ type: 'varchar', nullable: true })
  fileURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Course, (course) => course.lessons, {
    // onDelete: 'CASCADE',
  })
  course: Course;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  progress: LessonProgress[];
}
