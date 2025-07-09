import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'User email address', required: true })
  @IsEmail()
  identifier: string;

  @ApiProperty({ description: 'User password', required: true })
  @IsString()
  @MinLength(8)
  password: string;
}
