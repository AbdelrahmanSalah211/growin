import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'videos',
          timeout: 600000,
        },
        (error, result: any) => {
          console.log('result: ', result);
          if (error) {
            console.log('error: ', error);
            return reject(error);
          } 
          resolve(result);
        },
      );

      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }


  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'files',
          timeout: 600000,
        },
        (error, result: any) => {
          console.log(error, 'error');

          if (error) return reject(error);
          resolve(result);
        },
      );

      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }

  async uploadMultipleVideos(files: Express.Multer.File[]) {
    // console.log(files);

    const uploadPromises = files.map((file) => this.uploadVideo(file));
    return Promise.all(uploadPromises);
  }
}
