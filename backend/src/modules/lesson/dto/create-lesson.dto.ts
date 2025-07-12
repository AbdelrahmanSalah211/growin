import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { LessonType } from 'src/models';

export class CreateLessonDto {
  @IsNumber()
  courseId: number;

  @IsString()
  title: string;

  @IsEnum(LessonType)
  lessonType: LessonType;

  @IsString()
  subTitle: string;

  @IsString()
  fileURL: string;
  @IsInt()
  position: number;

  @IsString()
  section: string;
}
