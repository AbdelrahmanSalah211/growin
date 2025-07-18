import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Lesson, User } from '../../models/index';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { title, position, courseId } = createLessonDto;
    const lesson = this.lessonRepository.create({
      title,
      position: parseInt(position!),
      fileURL: createLessonDto.fileURL,
      course: { id: parseInt(courseId) } as Course,
    });
    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: number): Promise<Lesson | null> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  async deleteLesson(id: number): Promise<void> {
    await this.lessonRepository.delete(id);
  }

  async updateLesson(lessonId: number, instructorId: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['course'],
    });

    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }

    const instructor = await this.userRepository.findOne({
      where: { id: instructorId },
    });

    if (!instructor) {
      throw new Error(`Instructor with ID ${instructorId} not found`);
    }

    if (instructor.id != instructorId) {
      throw new Error(`Instructor with ID ${instructorId} is not authorized to update this lesson`);
    }

    const { title, position } = updateLessonDto;
    lesson.title = title || lesson.title;
    lesson.position = position ? parseInt(position) : lesson.position;

    if (updateLessonDto.fileURL) {
      lesson.fileURL = updateLessonDto.fileURL;
    }
    return this.lessonRepository.save(lesson);

  }

  async findCourseLessons(courseId: number): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { course: { id: courseId } },
      order: { position: 'ASC' },
    });
  }
}
