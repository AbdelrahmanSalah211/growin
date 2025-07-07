import { Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

import { 
  CreateUserDto,
  UpdateUserDto,
  CreatePasswordDto,
  UpdatePasswordDto
} from './dto/user.dto';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  
  async findByUserId(id: number): Promise<User | null> {
      return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'profileImage', 'userMode', 'bio'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'profileImage', 'userMode', 'bio'],
    });
  }
  
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findByUserId(id);
    if (!user) {
      throw new Error('User not found');
    }
    const { username, email: newEmail, bio } = dto;
    user.username = username || user.username;
    user.email = newEmail || user.email;
    user.bio = bio || user.bio;
    if (dto.profileImage && dto.imageDeleteURL) {
      user.profileImage = dto.profileImage;
      user.imageDeleteURL = dto.imageDeleteURL;
    }
    return this.userRepository.save(user);
  }

  async changePassword(id: number, dto: UpdatePasswordDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { currentPassword, newPassword } = dto;
    if (
      user && user.password &&
      (await User.correctPassword(user.password, currentPassword))
    ) {
      user.password = newPassword;
      return this.userRepository.save(user);
    }
    throw new Error('User not found');
  }

  async createPassword(id: number, dto: CreatePasswordDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { password } = dto;
    if (user.password) {
      throw new Error('Password already exists');
    }
    user.password = password;
    return this.userRepository.save(user);
  }

  async forgetPassword(email: string, protocol: string, host: string): Promise<{ status: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return {
        status: 'fail'
      }
    }
    console.log('Found user:', user);
    const resetToken = user.createPasswordResetToken();
    console.log('Generated reset token:', resetToken);
    await this.userRepository.save(user);
    const resetURL = `${protocol}://${host}/users/reset?token=${resetToken}`;
    void this.mailService.sendMail(
      user.email,
      'Password Reset Request',
      'reset-password',
      {
        name: user.username,
        url: resetURL,
      }
    );
    return {
      status: 'success'
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });
    if (!user || !user.passwordResetExpires || Number(user.passwordResetExpires) < Date.now()) {
      throw new Error('Invalid or expired token');
    }
    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    return this.userRepository.save(user);
  }
}
