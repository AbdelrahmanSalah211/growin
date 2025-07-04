import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseCategory } from 'src/models/courses-category.entity';

@Injectable()
export class CourseCategoryService {
  constructor(
    @InjectRepository(CourseCategory)
    private categoryRepo: Repository<CourseCategory>,
  ) {}

  findAll(): Promise<CourseCategory[]> {
    return this.categoryRepo.find({ relations: ['courses'] });
  }

  create(title: string): Promise<CourseCategory> {
    const category = this.categoryRepo.create({ title });
    return this.categoryRepo.save(category);
  }
}
