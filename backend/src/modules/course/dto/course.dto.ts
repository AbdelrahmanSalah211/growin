import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CourseLevel } from 'src/models';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  language: string;

  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level: CourseLevel;
  
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  courseCover?: string;

  @IsOptional()
  @IsString()
  imageDeleteURL?: string;
}