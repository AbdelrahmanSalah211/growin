import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Review } from 'src/models/review.entity';
import { createReviewDto, UpdateReviewDto } from './dto/review.dto';
import { Course } from 'src/models';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private dataSource: DataSource
  ) {}

  async createReview(id: number, courseId: number, dto: createReviewDto): Promise<Review | undefined> {
    const review = await this.dataSource.transaction('SERIALIZABLE', async transactionalEntityManager => {
      const existing = await transactionalEntityManager.findOne(Review, {
        where: { studentId: id, courseId }
      });
      if (existing) {
        throw new Error('You have already reviewed this course.');
      }
      const review = await transactionalEntityManager.save(Review, {
        ...dto,
        studentId: id,
        courseId,
      });
      await transactionalEntityManager.update(Course, { id: courseId }, {
        ratingSum: () => `ratingSum + ${dto.rating}`,
        numberOfReviewers: () => `numberOfReviewers + 1`
      });
      return review;
    });
    return review;
  }

  async updateReview(id: number, courseId: number, dto: UpdateReviewDto): Promise<Review | undefined> {
    const review = await this.dataSource.transaction('SERIALIZABLE', async transactionalEntityManager => {
      const review = await this.reviewRepository.findOne(
        { where: { studentId: id, courseId } }
      );
      if (!review) {
        throw new Error('Review not found');
      }
      review.comment = dto.comment || review.comment;
      review.helpful = dto.helpful !== undefined ? dto.helpful : review.helpful;
      if (dto.rating !== review.rating) {
        await transactionalEntityManager.increment(Course, { id: courseId }, 'ratingSum', dto.rating - review.rating);
        review.rating = dto.rating;
      }
      await transactionalEntityManager.save(review);
      return review;
    });
    return review;
  }

  async deleteReview(id: number, courseId: number): Promise<void> {
    await this.dataSource.transaction('SERIALIZABLE', async transactionalEntityManager => {
      const review = await transactionalEntityManager.findOne(Review, { where: { studentId: id, courseId } });
      if (!review) {
        throw new Error('Review not found');
      }
      await transactionalEntityManager.remove(review);
      await transactionalEntityManager.update(Course, { id: courseId }, {
        ratingSum: () => `ratingSum - ${review.rating}`,
        numberOfReviewers: () => `numberOfReviewers - 1`
      });
    });
  }

  async getStudentReviews(studentId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { studentId } });
  }
}
