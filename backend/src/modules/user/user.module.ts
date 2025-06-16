
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from 'src/modules/user/user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
