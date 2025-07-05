import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from 'src/models/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Post()
  async create(@Body() body: Partial<Review>): Promise<Review> {
    return this.reviewService.createReview(body);
  }
}