import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class createReviewDto {
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsString()
  comment: string;

  @IsBoolean()
  helpful: boolean;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsBoolean()
  helpful: boolean;
}
