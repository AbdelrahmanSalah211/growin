import { DataSource } from 'typeorm';
import { User } from '../models/user.entity';
import { readFileSync } from 'fs';
import { join } from 'path';

const sslCaPath = readFileSync(join(__dirname, '../../certs/ca.pem'));

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const AppDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        ssl: sslCaPath
          ? {
              ca: sslCaPath.toString(),
            }
          : false,
        logging: true,
        poolSize: 5,
        entities: [
          User,
        ],
        subscribers: [],
      });
      return AppDataSource.initialize();
    },
  },
];
