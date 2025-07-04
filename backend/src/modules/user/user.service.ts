import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async changePassword({
    email,
    currentPassword,
    newPassword,
  }: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: { email },
    });
    console.log('Found user:', foundUser);
    if (
      foundUser &&
      (await User.correctPassword(foundUser.password, currentPassword))
    ) {
      foundUser.password = newPassword;
      return this.userRepository.save(foundUser);
    }
    throw new Error('User not found');
  }

  async findByUsernameOrEmail(identifier: string) {
    return this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
