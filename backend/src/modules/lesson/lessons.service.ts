import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from '../../models/index';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      course: { id: createLessonDto.courseId },
    });
    return this.lessonRepository.save(lesson);
  }

  findByCourseId(courseId: number) {
    const lessons = this.lessonRepository.find({
      where: { course: { id: courseId } },
    });
    return lessons;
  }
  addFileURl(id: number, fileURL: string) {
    return this.lessonRepository.update(id, { fileURL: fileURL });
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: number) {
    return this.lessonRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
  
    if (!lesson) {
      throw new Error(`Lesson with ID ${id} not found`);
    }
  
    // Only overwrite fields if they are defined
    Object.assign(lesson, {
      ...updateLessonDto,
      fileURL: updateLessonDto.fileURL !== undefined ? updateLessonDto.fileURL : lesson.fileURL,
    });
  
    return this.lessonRepository.save(lesson);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }
}
