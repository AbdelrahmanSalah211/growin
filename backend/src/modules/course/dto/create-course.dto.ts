import {IsNumber,IsString,IsBoolean,IsEnum, IsInt} from "class-validator"
import { CourseLevel } from "src/models";



export class CreateCourseDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsBoolean()
    isPublished: boolean;
  
    @IsString()
    language: string;
  
    @IsString()
    imageDeleteURL: string;


    @IsInt()
    ratingSum: number;
  
    @IsEnum(['beginner', 'intermediate', 'advanced'])
    level: CourseLevel;
  
    @IsNumber()
    price: number;
  
    @IsInt()
    numberOfReviewers: number;
  }