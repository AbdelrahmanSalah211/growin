import {
    Entity,
    PrimaryColumn, 
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import {
    User,
    Course,
} from './index';

@Entity('review')
export class Review {
    @PrimaryColumn()
    courseId: number;

    @PrimaryColumn()
    studentId: number;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @Column()
    helpful: boolean;

    @ManyToOne(() => Course, (course) => course.reviews)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'studentId' })
    student: User;
}