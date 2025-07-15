import { randomBytes, createHash } from 'crypto';
import * as argon2 from 'argon2';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent,
  OneToMany,
} from 'typeorm';

import {
  LessonProgress,
  Review,
  Enrollment,
  Transaction,
  // InstructorPayout,
  Course,
} from './index';

export enum UserMode {
  LEARNER = 'learner',
  INSTRUCTOR = 'instructor',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ default: 'https://i.ibb.co/2HTV3dh/Default-profile-image.jpg' })
  profileImage: string;

  @Column({ nullable: true })
  imageDeleteURL: string;

  @Column({
    type: 'enum',
    enum: UserMode,
    default: UserMode.LEARNER,
  })
  userMode: UserMode;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: true })
  isPasswordPresent: boolean;

  @Column({ type: 'varchar', nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  passwordResetExpires: string | null;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null;

  @OneToMany(() => LessonProgress, (progress) => progress.user, {
    onDelete: 'CASCADE',
  })
  lessonProgress: LessonProgress[];
  
  // @OneToMany(() => InstructorPayout, (payout) => payout.instructor)
  // payouts: InstructorPayout[];

  @OneToMany(() => Transaction, (transaction) => transaction.course)
  transactions: Transaction[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
  @BeforeInsert()
  beforeInsertLowercase() {
    this.username = this.username.toLowerCase();
    this.email = this.email.toLowerCase();
  }

  static async correctPassword(
    userPassword: string,
    candidatePassword: string,
  ): Promise<boolean> {
    return argon2.verify(userPassword, candidatePassword);
  }

  createPasswordResetToken(): string {
    const resetToken = randomBytes(32).toString('hex');
    this.passwordResetToken = createHash('sha256').update(resetToken).digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = `${Date.now() + 10 * 60 * 1000}`;
    return resetToken;
  }
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password && event.entity.password.trim() !== '') {
      event.entity.password = await argon2.hash(event.entity.password);
    } else {
      event.entity.password = null;
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    const newPassword: string | undefined =
      event.entity && typeof event.entity.password === 'string'
        ? event.entity.password
        : undefined;
    const oldPassword: string | undefined =
      event.databaseEntity && typeof event.databaseEntity.password === 'string'
        ? event.databaseEntity.password
        : undefined;

    if (newPassword && newPassword !== oldPassword && event.entity) {
      event.entity.password = await argon2.hash(newPassword);
    }
  }
}
