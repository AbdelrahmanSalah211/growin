import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { Course } from './course.entity';

@Entity('instructor_payouts')
export class InstructorPayout {
  @PrimaryGeneratedColumn()
  id: number;

    
  @ManyToOne(() => User, (user) => user.payouts)
  instructor: User;

  @ManyToOne(() => Course, (course) => course.payouts)
  course: Course;

  @Column()
  transactionId: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default InstructorPayout;