import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseCategory } from 'src/models';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseCategory])],
  providers: [CourseService, ImageService],
  controllers: [CourseController],
})
export class CourseModule {}
