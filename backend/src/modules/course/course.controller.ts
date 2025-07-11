import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from 'src/models/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('instructor')
  async findAllCoursesByUser(
    @Req() req: { user: { sub: number } },
  ): Promise<Course[]> {
    return this.courseService.findAllCoursesByUser(req.user.sub);
  }

  @Get('deleted')
  async getAllBySoftDeleted(): Promise<Course[]> {
    return this.courseService.getAllBySoftDeleted();
  }

  @Post()
  async createCourse(
    @Body() course: CreateCourseDto,
    @Req() req: { user: { sub: number } },
  ): Promise<Course> {
    const newCourse = this.courseService.createCourse(req.user.sub, course);
    return newCourse;
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number): Promise<{ message: string }> {
    return this.courseService.delete(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Patch(':id')
  async updateCourse(
    @Param('id') id: number,
    @Body() updatedCourse: Partial<CreateCourseDto>,
  ): Promise<Course> {
    return this.courseService.updateCourse(id, updatedCourse);
  }
}
