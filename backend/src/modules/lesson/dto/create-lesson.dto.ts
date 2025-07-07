import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { LessonType } from 'src/models/lesson.entity';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsInt()
  position: number;

  @IsString()
  section: string;

  @IsOptional()
  @IsString()
  subTitle?: string;

  @IsEnum(LessonType)
  lessonType: LessonType;

  @IsInt()
  courseId: number;
}
