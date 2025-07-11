import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/models/lesson.entity';

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
  addFileURl(id: string, fileURL: string) {
    return this.lessonRepository.update(id, { fileURL });
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: number) {
    return this.lessonRepository.findOne({ where: { id } });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }
}
