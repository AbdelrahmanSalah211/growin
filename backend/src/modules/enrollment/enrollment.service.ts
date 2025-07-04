import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/models/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>
  ) {}

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['course', 'student'] });
  }

  async createEnrollment(data: Partial<Enrollment>): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create(data);
    return this.enrollmentRepository.save(enrollment);
  }
}
