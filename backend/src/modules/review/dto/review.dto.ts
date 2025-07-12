import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsString()
  comment: string;

  @IsBoolean()
  helpful: boolean;
}
