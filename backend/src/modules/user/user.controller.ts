import { Controller, Body, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Patch('password')
  async changePassword(
    @Body()
    {
      email,
      currentPassword,
      newPassword,
    }: {
      email: string;
      currentPassword: string;
      newPassword: string;
    },
  ): Promise<any> {
    return this.userService.changePassword({
      email,
      currentPassword,
      newPassword,
    });
  }
}
