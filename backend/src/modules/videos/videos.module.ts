import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadModule {}
