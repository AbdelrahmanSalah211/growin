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
import { CreateCourseDto } from './dto/create-course.dto';
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

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @Get('instructor')
  async findAllCoursesByUser(
    @Req() req: { user: { sub: number } },
  ): Promise<CreateCourseDto[]> {
    return this.courseService.findAllCoursesByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('deleted')
  async getAllBySoftDeleted(): Promise<Course[]> {
    return this.courseService.getAllBySoftDeleted();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @Post()
  async createCourse(
    @Body() course: CreateCourseDto,
    @Req() req: { user: { sub: number } },
  ): Promise<Course> {
    const newCourse = this.courseService.createCourse(req.user.sub, course);
    return newCourse;
  }

  @Get('search')
  async searchCourses(@Query() queryParams: any): Promise<{data: Course[]; hasMore: boolean}> {
    console.log('APIFeatures:', APIFeatures);
    return this.courseService.searchCourses(queryParams);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @Delete(':id')
  async deleteCourse(@Param('id') id: number): Promise<{ message: string }> {
    return this.courseService.delete(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateCourse(
    @Param('id') id: number,
    @Body() updatedCourse: Partial<CreateCourseDto>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateCourseDto> {
    console.log(file);

    if (file) {
      const result = await this.imageService.uploadImage(file);
      
      updatedCourse.imageDeleteURL = result.deleteUrl;
      updatedCourse.courseCover = result.imageUrl;
    }
    return this.courseService.updateCourse(id, updatedCourse);
  }
}
