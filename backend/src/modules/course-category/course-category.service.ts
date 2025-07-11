import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseCategory } from 'src/models/courses-category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(
    @InjectRepository(CourseCategory)
    private categoryRepository: Repository<CourseCategory>,
  ) {}

  async getCategories(): Promise<CourseCategory[]> {
    return this.categoryRepository.find();
  }

  async createCourseCategory(dto: CategoryDto): Promise<CourseCategory> {
    return this.categoryRepository.save({
      title: dto.title,
    });
  }
}
