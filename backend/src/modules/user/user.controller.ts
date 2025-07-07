import { Controller, Body, Get, Patch, UseGuards, Req, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { UpdatePasswordDto, UpdateUserDto, CreatePasswordDto, ResetPasswordDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../image/image.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly imageService: ImageService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  async getUserInfo(@Req() req: { user: { sub: number } }): Promise<User | null> {
    return this.userService.findByUserId(req.user.sub);
  }

  @Patch('info')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Req() req: { user: { sub: number } },
    @UploadedFile() file?: Express.Multer.File
  ): Promise<User> {
    if (file) {
      const result = await this.imageService.uploadImage(file);
      dto.profileImage = result.imageUrl;
      dto.imageDeleteURL = result.deleteUrl;
    }
    return await this.userService.updateUser(req.user.sub, dto);
  }


  @Patch('password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Body()
    dto: UpdatePasswordDto,
    @Req() req: { user: { sub: number } },
  ): Promise<any> {
    await this.userService.changePassword(req.user.sub, dto);
    return { message: 'Password updated successfully' };
  }

  @Patch('create-password')
  @UseGuards(AuthGuard)
  async createPassword(
    @Body()
    dto: CreatePasswordDto,
    @Req() req: { user: { sub: number } },
  ): Promise<any> {
    await this.userService.createPassword(req.user.sub, dto);
    return { message: 'Password created successfully' };
  }

  // how to extract properties from request body @Body('email')
  @Post('forget-password')
  async forgetPassword(
    @Body('email') email: string,
    @Req() req: Request
  ): Promise<{ message: string }> {
    console.log('Forget password requested for email:', email);
    const state = await this.userService.forgetPassword(email, req.protocol, req.get('host')!);
    if (state.status !== 'success') {
      setTimeout(() => {
        console.log('Password reset link sent to:', email);
      }, 1000);
    }
    return { message: 'Password reset link sent to your email' };
  }

  @Patch('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    await this.userService.resetPassword(dto.token, dto.newPassword);
    return { message: 'Password reset successfully' };
  }
}
