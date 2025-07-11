import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategory } from 'src/models/courses-category.entity';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseCategory])],
  providers: [CourseCategoryService],
  controllers: [CourseCategoryController],
})
export class CourseCategoryModule {}
