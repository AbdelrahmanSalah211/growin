import { IsEmail,IsEnum,IsOptional,IsString, IsStrongPassword, MinLength } from 'class-validator';
import { Modes } from './userModes.enum';

export class SignInDto {
  @IsEmail()
  identifier: string; 

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}


export class SignUpDTO extends SignInDto{
@IsString()
userName:string


@IsEnum(Modes)
userMode:Modes

@IsOptional()
@IsString()
profileImage?:string

@IsOptional()
@IsString()
bio?:string


}