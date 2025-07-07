import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.signUp(dto);
    return { accessToken };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}
  d;

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request & { user: { email: string; name: string; photo: string } }) {
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
