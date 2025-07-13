import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { ReviewsModule } from './modules/review/review.module';
import { AuthModule } from './modules/auth/auth.module';
import { LessonsModule } from './modules/lesson/lessons.module';
// import { UploadModule } from './modules/videos/videos.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
// import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { CartModule } from './modules/cart/cart.module';
import { RedisModule } from './modules/redis/redis.module';
import {
  User,
  UserSubscriber,
  Course,
  CourseCategory,
  Lesson,
  LessonProgress,
  Enrollment,
  Review,
  Transaction,
  InstructorPayout,
} from './models';

config();

const sslCaPath = readFileSync(join(__dirname, '../../certs/ca.pem'));
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      ssl: {
        ca: sslCaPath.toString(),
      },
      logging: true,
      poolSize: 5,
      entities: [
        User,
        Course,
        Lesson,
        LessonProgress,
        Review,
        Enrollment,
        CourseCategory,
        Transaction,
        InstructorPayout,
      ],
      subscribers: [
        UserSubscriber
      ],
    }),
    UserModule,
    CourseModule,
    ReviewsModule,
    LessonsModule,
    AuthModule,
    // UploadModule,
    CourseCategoryModule,
    // EnrollmentModule,
    CartModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
