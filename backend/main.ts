import { createApp } from './app';
import { environment } from './config/environment';
import { dataSource } from './db/data-source';

const run = async () => {
  await dataSource.initialize();

  console.log('Db Running');

  createApp().listen(environment.app.port, () => {
    console.log(`Server running on port ${environment.app.port}`);
  });
};

run();
