import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Query,
  Delete,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '../../models/index';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ImageService } from '../image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { APIFeatures } from 'utils/APIFeatures';
import { Roles } from '../authorization/roles.decorator';
import { UserMode } from 'src/models';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private imageService: ImageService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(
    @Body() course: CreateCourseDto,
    @Req() req: { user: { sub: number } },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Course> {
    if (file) {
      const result = await this.imageService.uploadImage(file);
      course.courseCover = result.imageUrl;
      course.imageDeleteURL = result.deleteUrl;
    }
    return this.courseService.createCourse(req.user.sub, course);
  }

  @Patch('publish/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  async publishCourse(
    @Param('courseId') courseId: number,
    @Req() req: { user: { sub: number } },
  ): Promise<{ message: string }> {
    return this.courseService.publishCourse(courseId, req.user.sub);
  }

  @Get('search')
  async searchCourses(@Query() queryParams: any): Promise<{data: Course[]; hasMore: boolean; matches: number}> {
    console.log('APIFeatures:', APIFeatures);
    return this.courseService.searchCourses(queryParams);
  }

  @Patch(':courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @UseInterceptors(FileInterceptor('file'))
  async updateCourse(
    @Param('courseId') courseId: number,
    @Req() req: { user: { sub: number } },
    @Body() updatedCourse: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Course> {
    if (file) {
      const result = await this.imageService.uploadImage(file);
      updatedCourse.courseCover = result.imageUrl;
      updatedCourse.imageDeleteURL = result.deleteUrl;
    }
    return this.courseService.updateCourse(courseId, req.user.sub, updatedCourse);
  }

  @Get('instructor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  async getInstructorCourses(
    @Req() req: { user: { sub: number } },
  ): Promise<Course[]> {
    return this.courseService.getInstructorCourses(req.user.sub);
  }

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':courseId')
  async getCourse(@Param('courseId') courseId: number): Promise<Course | null> {
    return this.courseService.getCourse(courseId);
  }

  @Delete(':courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  async deleteCourse(@Param('courseId') courseId: number): Promise<void> {
    return this.courseService.deleteCourse(courseId);
  }
}
