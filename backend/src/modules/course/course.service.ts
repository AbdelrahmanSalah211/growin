import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { User, Course } from 'src/models';
import { APIFeatures } from './../../../utils/APIFeatures';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createCourse(instructorId: number, courseDto: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create({
      ...courseDto,
      instructor: { id: instructorId } as User,
    });
    return this.courseRepository.save(newCourse);
  }

  async publishCourse(courseId: number, instructorId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, instructor: { id: instructorId } },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    course.isPublished = true;
    await this.courseRepository.save(course);
    return { message: `Course with ID ${courseId} has been published successfully` };
  }

  async updateCourse(
    courseId: number,
    instructorId: number,
    updatedCourse: UpdateCourseDto
  ) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, instructor: { id: instructorId } },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const { title, description, language, level, price } = updatedCourse;
    course.title = title || course.title;
    course.description = description || course.description;
    course.language = language || course.language;
    course.level = level || course.level;
    course.price = price || course.price;
    if (updatedCourse.courseCover && updatedCourse.imageDeleteURL) {
      course.courseCover = updatedCourse.courseCover;
      course.imageDeleteURL = updatedCourse.imageDeleteURL;
    }
    return this.courseRepository.save(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find({
      where: { isPublished: true },
      relations: ['instructor'],
    });
  }

  async getCourse(courseId: number): Promise<Course | null> {
    return this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructor', 'lessons', 'reviews'],
      order: {
        lessons: {
          position: 'ASC',
        },
      },
    });
  }

  async getInstructorCourses(instructorId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { instructor: { id: instructorId } },
    });
  }

  async deleteCourse(courseId: number): Promise<void> {
    return this.courseRepository.softDelete(courseId).then(() => {
      return;
    });
  }

  async searchCourses(
    queryParams: any,
  ): Promise<{ data: Course[]; hasMore: boolean; matches: number }> {
    const limit = queryParams.limit ? parseInt(queryParams.limit.toString(), 10) : 10;
    const page = queryParams.page ? parseInt(queryParams.page.toString(), 10) : 1;

    const baseQuery = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.courseCategory', 'course_category')
      .where('course.isPublished = :isPublished', { isPublished: true });

    const countFeatures = new APIFeatures(baseQuery, queryParams)
      .filter()
      .limitFields();

    const total = await countFeatures.getFilteredCount();

    const dataQuery = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.courseCategory', 'course_category')
      .where('course.isPublished = :isPublished', { isPublished: true });

    const dataFeatures = new APIFeatures(dataQuery, queryParams)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const results = await dataFeatures.execute();
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return { data: results, hasMore, matches: total };
  }
}
