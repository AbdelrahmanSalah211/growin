import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  imageDeleteURL?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  isPasswordPresent?: boolean;
}

export class UpdateUserDto  {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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
