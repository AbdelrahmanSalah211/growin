import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ImageService } from '../image/image.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly imageService: ImageService,
  ) {}

  @Post('login')
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ accessToken: string }> {
    let imageUrl = '';
    let deleteUrl = '';

    if (file) {
      const result = await this.imageService.uploadImage(file);
      imageUrl = result.imageUrl;
      deleteUrl = result.deleteUrl;
      console.log('Image uploaded:', imageUrl);
    }

    const finalDto = {
      ...dto,
      profileImage: imageUrl,
      imageDeleteURL: deleteUrl,
    };

    const { accessToken } = await this.authService.signUp(finalDto);
    return { accessToken };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}
  d;

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    const user = req.user;
    console.log('Google user:', user);
    const jwt = await this.authService.loginWithOAuth(user);
    return {
      message: 'Google authentication successful',
      user,
      accessToken: jwt.accessToken,
    };
  }
}
