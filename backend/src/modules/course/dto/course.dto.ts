import { IsString, IsEnum, IsNumber, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
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
  @IsNotEmpty()
  courseCover?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageDeleteURL?: string;

  @IsNumber()
  courseCategoryId: number;
}
export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level: CourseLevel;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  courseCover?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  imageDeleteURL?: string;

  @IsNumber()
  @IsOptional()
  courseCategoryId?: number;
}
