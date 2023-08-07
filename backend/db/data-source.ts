import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_TYPE,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

export const dataSource = new DataSource({
  type: DATABASE_TYPE as 'postgres' | 'mysql' | 'mongodb',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT || '5432'),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ['./entities/*.entity.ts'],
  synchronize: true,
});
