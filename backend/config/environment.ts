import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

export const getDatabasePort = () => {
  if (!DATABASE_PORT) {
    return 5432;
  }
  const databasePort = parseInt(DATABASE_PORT);
  if (isNaN(databasePort)) {
    throw new EnvironmentError('DATABASE_PORT');
  }
  return databasePort;
};

export const environment = {
  database: {
    host: DATABASE_HOST,
    name: DATABASE_NAME,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: getDatabasePort(),
  },
};

export class EnvironmentError extends Error {
  constructor(environmentName: string) {
    super('Invalid environment variable: ' + environmentName);
  }
}