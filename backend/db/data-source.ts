import { DataSource } from 'typeorm';
import { environment } from '../config/environment';

export const dataSource = new DataSource({
  type: 'postgres',
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.user,
  password: environment.database.password,
  database: environment.database.name,
  entities: ['./entities/*.entity.ts'],
  synchronize: true,
});
