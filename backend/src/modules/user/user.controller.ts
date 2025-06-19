import { Controller, Body, Get, Post, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(@Body() user: User, @UploadedFile() file: Express.Multer.File): Promise<User> {
    if (file) {
      // call to img storage service to upload the file
    }
    const foundUser =  this.userService.createUser(user);
    return foundUser;
  }

  @Post('login')
  async login(@Body() user: User): Promise<User> {
    return this.userService.login(user);
  }

  @Patch('password')
  async changePassword(@Body() {email, currentPassword, newPassword}: {email: string, currentPassword: string, newPassword: string}): Promise<any> {
    return this.userService.changePassword({email, currentPassword, newPassword});
  }


}
