import { IsNumber } from "class-validator";

export class addCourseToCartDto {
  @IsNumber()
  courseId: number;
}

export class removeCourseFromCartDto extends addCourseToCartDto {}

export class CartCourseDto {
  courseId: number;
  title: string;
  price: number;
  language: string;
  ratingSum: number;
  numberOfReviewers: number;
  courseCover?: string;
  description: string;
}