import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  identifier: string; //* email or username

  @IsString()
  password: string;
}
