import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class reviewDTO {
  @IsNumber()
  courseID: number;

  @IsNumber()
  studentID: number;

  @IsNumber()
  rates: number;

  @IsString()
  comment: string;

  @IsBoolean()
  helpful: boolean;
}
