import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User, UserSubscriber } from './models/user.entity';
import { Course } from './models/course.entity';
import { Lesson } from './models/lesson.entity';
import { LessonProgress } from './models/lesson_progress.entity';
import { CourseModule } from './modules/course/course.module';
import { Review } from './models/review.entity';
import { ReviewsModule } from './modules/review/review.module';
import { Enrollment } from './models/enrollment.entity';
import { CourseCategory } from './models/courses-category.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

config();

const sslCaPath = readFileSync(join(__dirname, '../certs/ca.pem'));

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
      ],
      subscribers: [
        UserSubscriber
      ],
    }),
    UserModule,
    CourseModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
