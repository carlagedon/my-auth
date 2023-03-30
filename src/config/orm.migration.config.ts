import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: false,
  synchronize: true,
  name: 'default',
  entities: [path.join(__dirname, '..', '/**/*.entity.{ts, js}')],
  migrations: [path.join(__dirname, '..', 'database/migrations/*.ts')],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
