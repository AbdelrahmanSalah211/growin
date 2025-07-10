import { Controller, Body, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from 'src/models/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCourse(
    @Body() course: CreateCourseDto,
    @Req() req: { user: { sub: number } },
  ): Promise<Course> {
    const newCourse = this.courseService.createCourse(req.user.sub, course);
    return newCourse;
  }
}
