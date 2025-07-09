import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginPayloadDto {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/profiles/123.jpg',
    description: 'Profile image URL (optional)',
  })
  profileImage?: string;

  @ApiProperty({
    example: 'student',
    description: 'Current user mode (e.g., student, teacher)',
  })
  userMode: string;
}
