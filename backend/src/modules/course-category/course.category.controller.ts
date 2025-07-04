import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourseCategoryService } from './course.category.service';
import { CourseCategory } from 'src/models/courses-category.entity';

@Controller('courseCategories')
export class CourseCategoryController {
  constructor(private readonly categoryService: CourseCategoryService) {}

  @Get()
  getAll(): Promise<CourseCategory[]> {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body('title') title: string): Promise<CourseCategory> {
    return this.categoryService.create(title);
  }
}
