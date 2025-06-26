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
import { CourseModule } from './modules/course/course.module';
import { LessonProgress } from './models/lesson_progress.entity';
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
      entities: [User, Course, Lesson, LessonProgress],
      subscribers: [UserSubscriber],
    }),
    UserModule,
    CourseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
