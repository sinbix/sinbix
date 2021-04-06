import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { User, UserProfile } from './entities';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'example',
  database: 'auth',
  entities: [User, UserProfile],
  synchronize: false,
  migrations: [path.join(__dirname, './migrations/*.ts')],
};

export default config;
