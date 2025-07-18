import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../videos/cloudinary.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { UserMode } from 'src/models';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @UseInterceptors(FileInterceptor('file'))
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      createLessonDto.fileURL = result.secure_url;
    }
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Get('course/:courseId')
  async findCourseLessons(
    @Param('courseId') courseId: number,
  ){
    return this.lessonsService.findCourseLessons(courseId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR, UserMode.LEARNER)
  @Get(':lessonId')
  async getLesson(
    @Param('lessonId') lessonId: number
  ) {
    const lesson = await this.lessonsService.getLesson(lessonId);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }
    return lesson;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: number,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { sub: number } },
  ) {
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      updateLessonDto.fileURL = result.secure_url;
    }
    return this.lessonsService.updateLesson(lessonId, req.user.sub, updateLessonDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.INSTRUCTOR)
  @Delete(':lessonId')
  async deleteLesson(
    @Param('lessonId') lessonId: number
  ) {
    await this.lessonsService.deleteLesson(lessonId);
    return { message: `Lesson with ID ${lessonId} deleted successfully` };
  }
}
