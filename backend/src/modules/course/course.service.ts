
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/models/course.entity';
import { CreateCourseDto } from './dto/create_course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    const newCourse = new Course();
    
    newCourse.title = course.title;
    newCourse.description = course.description;
    newCourse.isPublished = course.isPublished;
    newCourse.language = course.language;
    newCourse.imageDeleteURL = course.imageDeleteURL;
    newCourse.ratingSum = course.ratingSum;
    newCourse.level = course.level;
    newCourse.price = course.price;
    newCourse.numberOfReviewers = course.numberOfReviewers;
    return this.courseRepository.save(newCourse);
  }
}