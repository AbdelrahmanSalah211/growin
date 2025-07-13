import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import {
  User,
  Course,
} from './index';

export enum EnrollmentStatus {
  COMPLETED = 'completed',
  IN_PROCESS = 'inProcess',
}

@Entity('enrollments')
export class Enrollment {
  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  studentId: number;

    @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.IN_PROCESS,
  })
  status: EnrollmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => User, (user) => user.enrollments)
  student: User;
}
