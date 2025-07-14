import { Controller, Get, Post, Body, Req, ParseIntPipe, Query } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from 'src/models/enrollment.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/roles.decorator';
import { UserMode } from 'src/models';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}


  @Get("my-enrollments")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async findUserEnrollments(
    @Req() req: { user: { sub: number } },
  ): Promise<Enrollment[]> {
    return this.enrollmentService.findUserEnrollments(req.user.sub);
  }

@Get('is-enrolled')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserMode.LEARNER)
async isUserEnrolled(
  @Req() req: { user: { sub: number } },
  @Query('courseId', ParseIntPipe) courseId: number,
): Promise<{ enrolled: boolean }> {
  const userId = req.user.sub;
  const enrolled = await this.enrollmentService.isUserEnrolled(userId, courseId);
  return { enrolled };
}
  @Post()
  async create(
    @Body() body: any,
  ): Promise<any> {
    return this.enrollmentService.createEnrollment(body);
  }
}
