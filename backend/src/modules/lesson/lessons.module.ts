import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson, User } from 'src/models';
import { UploadModule } from '../videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, User]), UploadModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
