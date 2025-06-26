import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '../../models/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
    const { identifier, password } = dto;

    const user = await this.userService.findByUsernameOrEmail(identifier);
    const isValid =
      user && (await User.correctPassword(user.password, password));

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }

  async signUp(dto: CreateUserDto) {
    const { email, username } = dto;

    const existing =
      (await this.userService.findByUsernameOrEmail(email)) ||
      (await this.userService.findByUsernameOrEmail(username));

    if (existing) {
      throw new BadRequestException('Email or username already taken');
    }

    const user = await this.userService.createUser(dto);

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async loginWithOAuth(
    googleUser: any,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    const { email, name, photo } = googleUser;

    let user = await this.userService.findByUsernameOrEmail(email);

    if (!user) {
      user = await this.userService.createUser({
        username: name,
        email,
        password: '',
        profileImage: photo,
        bio: `OAuth Google user ${name}`,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
      },
    };
  }
}
