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
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../videos/cloudinary.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { LessonType } from 'src/models';
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Post('bulk')
  async createBulk(@Body() createLessonDtos: CreateLessonDto[]) {
    return Promise.all(
      createLessonDtos.map((dto) => this.lessonsService.create(dto)),
    );
  }

  @Get('courseId/:id')
  getByCourse(@Param('id') courseId: number) {
    return this.lessonsService.findByCourseId(courseId);
  }
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }

  @Patch('file/:id') // ←  generic “file” endpoint
  @UseInterceptors(FileInterceptor('file'))
  async uploadLessonFile(
    @Param('id') id: string, // get the lesson id from the URL
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: any, // any other fields (title, section, lessonType…)
  ) {
    const numericId = Number(id);

    // ────────────────────────────────────────────────────────────────
    // 1  Fetch the lesson so you know its current lessonType
    // ────────────────────────────────────────────────────────────────
    const existingLesson = await this.lessonsService.findOne(numericId);
    if (!existingLesson) throw new NotFoundException('Lesson not found');

    // allow the client to change the type in the same call
    const lessonType = (body?.lessonType ??
      existingLesson.lessonType) as LessonType;

    // ────────────────────────────────────────────────────────────────
    // 2  Decide which Cloudinary resource_type to use
    // ────────────────────────────────────────────────────────────────
    let uploadedUrl: string | undefined;

    if (file) {
      let result;
      if (lessonType === LessonType.VIDEO) {
        // videos – keep resource_type "video" (or "auto")
        result = await this.cloudinaryService.uploadVideo(file); // your existing helper
      } else {
        // docs, pdf, zip, etc. – use resource_type "raw"
        result = await this.cloudinaryService.uploadFile(file); // make helper that accepts 'raw'
      }

      if (!result?.secure_url) throw new Error('Cloudinary upload failed');
      uploadedUrl = result.secure_url;
    }

    // ────────────────────────────────────────────────────────────────
    // 3  Build the payload to update the lesson
    // ────────────────────────────────────────────────────────────────
    const updatePayload: Record<string, any> = { ...body };

    if (uploadedUrl) updatePayload.fileURL = uploadedUrl;
    if (lessonType !== existingLesson.lessonType)
      updatePayload.lessonType = lessonType;

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException('No file or update data provided');
    }

    // ────────────────────────────────────────────────────────────────
    // 4  Persist changes
    // ────────────────────────────────────────────────────────────────
    return this.lessonsService.update(numericId, updatePayload);
  }
}
