import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Course } from 'src/models/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    private redisService: RedisService,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  async addCourseToCart(userId: number, courseId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      select: ['id', 'title', 'description', 'price', 'language', 'courseCover', 'level', 'ratingSum', 'numberOfReviewers'],
    });
    if (!course) throw new Error('Course not found');
    const key = `cart:${userId}`;
    const existing = await this.redisService.get(key);
    let cart: any[] = [];

    if (existing) {
      cart = JSON.parse(existing);
    }

    const exists = cart.find(c => c.courseId === course.id);
    if (!exists) {
      cart.push({courseId: course.id, title: course.title, description: course.description, price: course.price, language: course.language, courseCover: course.courseCover, level: course.level, ratingSum: course.ratingSum, numberOfReviewers: course.numberOfReviewers});
      await this.redisService.set(key, JSON.stringify(cart));
    }
    return cart;
  }

  async getCart(userId: string): Promise<Course[]> {
    const key = `cart:${userId}`;
    const existing = await this.redisService.get(key);
    return existing ? JSON.parse(existing) : [];
  }

  async removeCourseFromCart(userId: number, courseId: number) {
    const key = `cart:${userId}`;
    const existing = await this.redisService.get(key);
    if (!existing) return;

    const cart = JSON.parse(existing).filter((c: any) => c.courseId !== courseId);
    await this.redisService.set(key, JSON.stringify(cart));
    return cart;
  }

  async clearCart(userId: number): Promise<void> {
    const key = `cart:${userId}`;
    await this.redisService.del(key);
  }
}
