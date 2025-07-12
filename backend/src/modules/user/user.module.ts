import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { MailModule } from '../mail/mail.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, ImageModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
