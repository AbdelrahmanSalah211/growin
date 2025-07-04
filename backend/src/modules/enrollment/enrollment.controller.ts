import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from 'src/models/enrollment.entity';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async getAll(): Promise<Enrollment[]> {
    return this.enrollmentService.findAll();
  }

  @Post()
  async create(@Body() body: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentService.createEnrollment(body);
  }
}
