import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { User, Course } from 'src/models';
import { APIFeatures } from './../../../utils/APIFeatures';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lessons', 'lesson')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .leftJoinAndSelect('course.reviews', 'review')
      .leftJoinAndSelect('course.enrollments', 'enrollment')
      .orderBy('lesson.position', 'DESC')
      .getMany();
    // return this.courseRepository.find({
    //   relations: ['lessons', 'instructor', 'reviews', 'enrollments'],

    // });
  }

  async createCourse(
    instructor_id: number,
    course: CreateCourseDto,
  ): Promise<Course> {
    const newCourse = new Course();
    newCourse.title = course.title;
    newCourse.instructor = { id: instructor_id } as User;
    newCourse.description = course.description;
    newCourse.isPublished = course.isPublished;
    newCourse.language = course.language;
    newCourse.imageDeleteURL = course.imageDeleteURL;
    newCourse.ratingSum = course.ratingSum;
    newCourse.level = course.level;
    newCourse.price = course.price;
    newCourse.numberOfReviewers = course.numberOfReviewers;
    return this.courseRepository.save(newCourse);
  }

  // async uploadImage(courseId: number) {
  //   const course = await this.courseRepository.findOne({
  //     where: { id: courseId },
  //   });

  // }

  async findAllCoursesByUser(userId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { instructor: { id: userId } },
    });
  }

  async findById(id: number): Promise<Course> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lessons', 'lesson')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .leftJoinAndSelect('course.reviews', 'review')
      .leftJoinAndSelect('review.student', 'student')
      .leftJoinAndSelect('course.enrollments', 'enrollment')
      .where('course.id = :id', { id })
      .orderBy('lesson.position', 'ASC')
      .getOne();

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async delete(id: number) {
    await this.courseRepository.softDelete(id);
    return {
      message: `Course with ID ${id} has been deleted successfully`,
    };
  }

  async getAllBySoftDeleted(): Promise<Course[]> {
    return this.courseRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  async updateCourse(
    id: number,
    updatedCourse: Partial<CreateCourseDto>,
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    Object.assign(course, updatedCourse);
    return this.courseRepository.save(course);
  }

  async findByInstructor(instructorId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { instructor: { id: instructorId } },
      relations: ['lessons'],
    });
  }

  async searchCourses(
    queryParams: any,
  ): Promise<{ data: Course[]; hasMore: boolean }> {
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;

    const query = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.courseCategory', 'course_category')
      .where('course.isPublished = :isPublished', { isPublished: true });

    const features = new APIFeatures(query, {
      ...queryParams,
      limit: (limit + 1).toString(),
    })
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const results = await features.execute();
    const hasMore = results.length > limit;
    const data = hasMore ? results.slice(0, limit) : results;

    return { data, hasMore };
  }
}
