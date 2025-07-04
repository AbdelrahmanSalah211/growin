import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseCategory } from 'src/models/courses-category.entity';

@Injectable()
export class CourseCategoryService {
  constructor(
    @InjectRepository(CourseCategory)
    private categoryRepository: Repository<CourseCategory>,
  ) {}

  findAll(): Promise<CourseCategory[]> {
    return this.categoryRepository.find({ relations: ['courses'] });
  }

  create(title: string): Promise<CourseCategory> {
    const category = this.categoryRepository.create({ title });
    return this.categoryRepository.save(category);
  }
}
