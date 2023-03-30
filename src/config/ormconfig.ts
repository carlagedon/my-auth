import * as path from 'path';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const OrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      entities: [path.join(__dirname, '..', '/**/*.entity.{ts, js}')],
      migrations: [path.join(__dirname, '..', 'database/migrations/*.{ts, js}')],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    };
  },
};

// export const OrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [path.join(__dirname, '..', '/**/*.entity.{ts, js}')],
//   migrations: [path.join(__dirname, '..', 'database/migrations/*.{ts, js}')],
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// };
