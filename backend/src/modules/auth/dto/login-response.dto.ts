import { ApiProperty } from '@nestjs/swagger';
import { LoginPayloadDto } from './login-payload.dto';

export class LoginResponseDto {
  @ApiProperty({ example: 'Login Successful' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ type: () => LoginPayloadDto })
  user: LoginPayloadDto;
}
