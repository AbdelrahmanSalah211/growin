import crypto from 'crypto';
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

import { LessonProgress } from './lesson_progress.entity';

export enum UserMode {
  LEARNER = 'learner',
  INSTRUCTOR = 'instructor',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'https://i.ibb.co/2HTV3dh/Default-profile-image.jpg' })
  profileImage: string;

  @Column({ default: '' })
  imageDeleteURL: string;

  @Column({
    type: 'enum',
    enum: UserMode,
    default: UserMode.LEARNER,
  })
  userMode: UserMode;

  @Column()
  bio: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @OneToMany(() => LessonProgress, (progress) => progress.user, {
    onDelete: 'CASCADE',
  })
  lessonProgress: LessonProgress[];

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
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
  }
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await argon2.hash(event.entity.password);
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

export default User;
