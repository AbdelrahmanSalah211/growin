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
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../videos/cloudinary.service';
import { JwtAuthGuard } from '../auth/auth.guard';
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

  @Post('video/:id')
  @UseInterceptors(FileInterceptor('file')) // max 20 files
  async uploadVideo(
    @Param('id') id: string,
    @UploadedFile() files: Express.Multer.File,
  ) {
    console.log(files, 'files on upload');

    const result = await this.cloudinaryService.uploadVideo(files);

    if (!result || result.length === 0) {
      throw new Error('Failed to upload video');
    }

    return this.lessonsService.addFileURl(id, result.secure_url);
  }
}
