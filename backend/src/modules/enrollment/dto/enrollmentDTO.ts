import { IsEnum, IsNumber } from "class-validator";
import { EnrollmentStatus } from "src/models";

export class enrollmentDTO
{
    @IsNumber()
    courseId:number
    @IsNumber()
    studentId:number
    @IsEnum(EnrollmentStatus)
    status:EnrollmentStatus
    
}