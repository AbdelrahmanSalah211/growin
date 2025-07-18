import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import {
  User,
  Lesson,
} from './index';

@Entity('lesson_progress')
export class LessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isWatched: boolean;

  @Column({ type: 'timestamp', nullable: true })
  watchedAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.lessonProgress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
