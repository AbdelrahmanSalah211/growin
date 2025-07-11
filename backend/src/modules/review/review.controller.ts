import { Controller, Get, Post, Body, UseGuards, Req, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from 'src/models/review.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { UserMode } from 'src/models';
import { ReviewDto } from './dto/review.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles(UserMode.LEARNER)
  @Post(':courseId')
  async createReview(
    @Param('courseId') courseId: number,
    @Body() dto: ReviewDto,
    @Req() req: { user: { sub: number } }
  ): Promise<Review | undefined> {
    return this.reviewService.createReview(req.user.sub, courseId, dto);
  }

  @Roles(UserMode.LEARNER)
  @Patch(':courseId')
  async updateReview(
    @Param('courseId') courseId: number,
    @Body() dto: ReviewDto,
    @Req() req: { user: { sub: number } },
  ): Promise<Review | undefined> {
    return this.reviewService.updateReview(req.user.sub, courseId, dto);
  }

  @Roles(UserMode.LEARNER)
  @Delete(':courseId')
  async deleteReview(
    @Param('courseId') courseId: number,
    @Req() req: { user: { sub: number } },
  ): Promise<void> {
    return this.reviewService.deleteReview(req.user.sub, courseId);
  }

  @Get()
  async getStudentReviews(
    @Req() req: { user: { sub: number } }
  ): Promise<Review[]> {
    return this.reviewService.getStudentReviews(req.user.sub);
  }
}