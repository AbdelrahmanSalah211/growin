import { Controller, Body, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from 'src/models/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Post()
  async createCourse(@Body() course: CreateCourseDto): Promise<Course> {
    
    const newCourse =  this.courseService.createCourse(course);
    return newCourse;
  }
}
