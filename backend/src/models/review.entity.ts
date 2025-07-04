import {
    Entity,
    PrimaryColumn, 
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('review')
export class Review {
    @PrimaryColumn({ type: 'int' })
    courseId: number;

    @PrimaryColumn({ type: 'int' })
    studentId: number;

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'bigint' })
    rates: number;

    @Column({ type: 'boolean', default: false })
    helpful: boolean;

    @ManyToOne(() => Course, (course) => course.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student: User;
}