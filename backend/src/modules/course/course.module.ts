import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/models/course.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService, ImageService],
  controllers: [CourseController],
})
export class CourseModule {}
