import { IsString, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  courseId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  fileURL?: string;

  @IsOptional()
  @IsString()
  position?: string;
}

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  fileURL?: string;

  @IsOptional()
  @IsString()
  position?: string;
}