import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CourseLevel } from 'src/models';
export class createCourseDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  instructorId: number;

  @IsInt()
  categoryId: number;

  @IsBoolean()
  isPublished: boolean;

  @IsInt()
  @IsOptional()
  reviews?: number;

  @IsInt()
  @IsOptional()
  numofReviews?: number;

  @IsString()
  language: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsInt()
  sum_rating?: number;
}
