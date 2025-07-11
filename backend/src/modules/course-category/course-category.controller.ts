import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategory } from 'src/models/courses-category.entity';
import { CategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { UserMode } from 'src/models';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('course-categories')
export class CourseCategoryController {
  constructor(private readonly categoryService: CourseCategoryService) {}

  @Roles(UserMode.INSTRUCTOR, UserMode.LEARNER)
  @Get()
  async getCategories(): Promise<CourseCategory[]> {
    return this.categoryService.getCategories();
  }

  @Roles(UserMode.INSTRUCTOR, UserMode.LEARNER)
  @Post()
  async createCourseCategory(@Body() dto: CategoryDto): Promise<CourseCategory> {
    return this.categoryService.createCourseCategory(dto);
  }
}
