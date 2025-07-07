import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '../../models/user.entity';
import { CreateUserDto } from '../user/dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(dto: SignInDto): Promise<{ accessToken: string, user: Partial<User> }> {
    const { identifier, password } = dto;

    const user = await this.userRepository.findOne({ where: { email: identifier } });
    const isValid =
      user && user.password && (await User.correctPassword(user.password, password));

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, userMode: user.userMode };
    const token = await this.jwtService.signAsync(payload)

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        userMode: user.userMode,
      },
    };
  }

  async signUp(dto: CreateUserDto) {
    const { email } = dto;

    const existing = await this.userService.findByEmail(email);

    if (existing) {
      throw new BadRequestException('Email already taken');
    }

    const user = await this.userService.createUser(dto);

    const payload = { sub: user.id, email: user.email, userMode: user.userMode };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async loginWithOAuth(
    googleUser: { email: string; name: string; photo: string },
  ): Promise<{ accessToken: string; user: Partial<User> }> {
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

    const payload = { sub: user.id, email: user.email, userMode: user.userMode };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        userMode: user.userMode,
      },
    };
  }
}
