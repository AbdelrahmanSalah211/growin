import { PartialType } from '@nestjs/mapped-types';
import { createCourseDTO } from './createCourse.dto';

export class updateCourse extends PartialType(createCourseDTO) {}
