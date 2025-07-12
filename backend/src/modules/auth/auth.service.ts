import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '../../models/user.entity';
import { CreateUserDto } from '../user/dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async generateAccessToken(user: User): Promise<{ accessToken: string }>{
    const accessPayload = { sub: user.id, email: user.email, userMode: user.userMode };
    const accessToken = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '60m'
    });
    return { accessToken };
  }
  private async generateRefreshToken(user: User): Promise<{ refreshToken: string }>{
    const refreshPayload = { sub: user.id };
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
    });
    await this.userRepository.update(user.id, {
      refreshToken,
    });
    return { refreshToken }
  }

  async signIn(dto: SignInDto): Promise<{ accessToken: string; refreshToken: string; user: Partial<User> }> {
    const { identifier, password } = dto;

    const user = await this.userRepository.findOne({ where: { email: identifier } });
    const isValid =
      user && user.password && (await User.correctPassword(user.password, password));

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken } = await this.generateAccessToken(user);
    const { refreshToken } = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        userMode: user.userMode,
      },
    };
  }

  async signUp(dto: CreateUserDto): Promise<{ message: string }> {
    const { email } = dto;
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already taken');
    }
    await this.userService.createUser(dto);
    return {
      message: "User created successfully"
    };
  }

  async loginWithOAuth(
    googleUser: { email: string; name: string; photo: string },
  ): Promise<{ accessToken: string; refreshToken: string; user: Partial<User> }> {
    const { email, name, photo } = googleUser;
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.createUser({
        username: name,
        email,
        password: '',
        profileImage: photo,
      });
    }
    const { accessToken } = await this.generateAccessToken(user);
    const { refreshToken } = await this.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        userMode: user.userMode,
      },
    };
  }

  async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<{ 
    accessToken: string
  }> {
    const { refreshToken } = refreshTokenDto;
    try {
      const payload: { sub: number } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      });
      const user = await this.userRepository.findOne({
        where: { id: payload.sub }
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('refresh_token_invalid');
      }
      const { accessToken } = await this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      console.error('error: ', error);
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('refresh_token_expired');
      }
      throw new UnauthorizedException('refresh_token_invalid');
    }
  }

  async logout(id: number){
    return this.userRepository.update(id, {
      refreshToken: null,
    });
  }
}
