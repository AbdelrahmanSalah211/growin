import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from 'src/models/lesson.entity';
import { UploadModule } from '../videos/videos.module';


@Module({
  imports: [TypeOrmModule.forFeature([Lesson]),
  UploadModule

],
  controllers: [LessonsController],
  providers: [LessonsService,LessonsController],
})
export class LessonsModule {}
