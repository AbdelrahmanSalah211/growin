import { Controller, Get, /*Post,*/ Body } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategory } from 'src/models/courses-category.entity';
// import { CategoryDto } from './dto/category.dto';

@Controller('course-categories')
export class CourseCategoryController {
  constructor(private readonly categoryService: CourseCategoryService) {}

  @Get()
  async getCategories(): Promise<CourseCategory[]> {
    return this.categoryService.getCategories();
  }

  // @Post()
  // async createCourseCategory(@Body() dto: CategoryDto): Promise<CourseCategory> {
  //   return this.categoryService.createCourseCategory(dto);
  // }
}
