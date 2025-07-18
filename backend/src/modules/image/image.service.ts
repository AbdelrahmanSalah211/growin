import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

interface ImgbbUploadResponse {
  data: {
    display_url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

@Injectable()
export class ImageService {
  private readonly IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';
  private readonly apiKey: string;

  constructor() {
    const key = process.env.IMGBB_API_KEY;
    if (!key) {
      throw new Error('IMGBB_API_KEY is not defined in environment variables');
    }
    this.apiKey = key;
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ imageUrl: string; deleteUrl: string }> {
    if (!file) {
      throw new InternalServerErrorException('No file provided');
    }

    // Convert buffer to base64 (imgbb expects this format)
    const imageBase64 = file.buffer.toString('base64');

    // const form = new URLSearchParams();
    const form = new FormData();
    form.append('key', this.apiKey);
    form.append('image', imageBase64);

    try {
      const response = await axios.post<ImgbbUploadResponse>(
        this.IMGBB_UPLOAD_URL,
        form/*.toString()*/,
        // {
          // headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          // },
        // },
      );

      const { display_url, delete_url } = response.data.data;

      return {
        imageUrl: display_url,
        deleteUrl: delete_url,
      };
    } catch (err: any) {
      console.error('Image upload failed:', err.response?.data || err.message);
      throw new InternalServerErrorException(
        'Failed to upload image to ImageBB',
      );
    }
  }
}
