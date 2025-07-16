import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
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

  @Get('is-enrolled/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserMode.LEARNER)
  async isUserEnrolled(
    @Req() req: { user: { sub: number } },
    @Param('courseId') courseId: number,
  ): Promise<{ enrolled: boolean }> {
    const enrollment = await this.enrollmentService.isUserEnrolled(req.user.sub, courseId);
    if (!enrollment) {
      return { enrolled: false };
    }
    return { enrolled: true };
  }

  @Post()
  async create(
    @Body() body: any,
  ): Promise<any> {
    return this.enrollmentService.createEnrollment(body);
  }
}
