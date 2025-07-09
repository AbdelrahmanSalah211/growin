import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username (max 30 chars)',
    maxLength: 30,
    required: true,
  })
  @IsString()
  @MaxLength(30)
  username: string;

  @ApiProperty({ description: 'User email address', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Strong password (min 8 chars)',
    minLength: 8,
    required: true,
  })
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({ description: 'Profile image URL (optional)' })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiPropertyOptional({
    description: 'Cloud image delete token URL (optional)',
  })
  @IsOptional()
  @IsString()
  imageDeleteURL?: string;

  @ApiPropertyOptional({ description: 'Short user bio (optional)' })
  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;
}

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  imageDeleteURL?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class CreatePasswordDto {
  @IsStrongPassword()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @IsStrongPassword()
  newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @MinLength(8)
  @IsStrongPassword()
  newPassword: string;
}
