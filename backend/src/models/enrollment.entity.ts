import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

export enum EnrollmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  IN_PROCESS = 'inProcess',
}

@Entity('enrollments')
export class Enrollment {
  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  studentId: number;

  @CreateDateColumn()
  enrolledAt: Date;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status: EnrollmentStatus;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;
}
