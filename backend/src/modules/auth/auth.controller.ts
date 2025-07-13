import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.signIn(dto);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return {
      message: 'Login Successful',
      accessToken,
      user,
    };
  }

  @Post('signup')
  async createUser(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.authService.signUp(dto);
  }

  @Post('refresh')
  async refreshAccessToken(@Req() req: Request) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { accessToken } = await this.authService.refreshAccessToken({
      refreshToken,
    });

    return {
      accessToken,
      message: 'Access token refreshed successfully',
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req: { user: { sub: number } },
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(req.user.sub);
    response.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}
  // d;

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req()
    req: Request & { user: { email: string; name: string; photo: string } },
    @Res() res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithOAuth(req.user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send(`
    <html>
      <body>
        <script>
          window.opener.postMessage(
            ${JSON.stringify({
              accessToken,
              user,
              source: 'google-auth',
            })},
            "*"
          );
          window.close();
        </script>
      </body>
    </html>
  `);
  }
}
