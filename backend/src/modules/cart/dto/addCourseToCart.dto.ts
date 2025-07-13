import { IsNumber } from "class-validator";

export class addCourseToCartDto {
  @IsNumber()
  courseId: number;
}

export class removeCourseFromCartDto extends addCourseToCartDto {}