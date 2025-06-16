import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined'));

  await app.listen(process.env.PORT!);
}
bootstrap().then(() => {
  console.log(`Server is running on port ${process.env.PORT}`);
}).catch((error) => {
  console.error('Error starting the server:', error);
});
