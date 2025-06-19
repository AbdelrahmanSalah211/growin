
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: User): Promise<User> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.profileImage = user.profileImage;
    newUser.imageDeleteURL = user.imageDeleteURL;
    newUser.bio = user.bio;
    return this.userRepository.save(newUser);
  }

  async login(user: User): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (foundUser && await User.correctPassword(user.password, foundUser.password)) {
      return foundUser;
    }
    throw new Error('Invalid credentials');
  }

  async changePassword({email, currentPassword, newPassword}: {email: string, currentPassword: string, newPassword: string}): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: { email },
    });
    console.log('Found user:', foundUser);
    if (foundUser && await User.correctPassword(foundUser.password, currentPassword)) {
      foundUser.password = newPassword;
      return this.userRepository.save(foundUser);
    }
    throw new Error('User not found');
  }
}
