import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

import { Post } from './entities/post.entity';

const config: ConnectionOptions = {
  type: 'mongodb',
  host: 'localhost',
  database: 'mongo',
  port: 27017,
  authSource: 'admin',
  username: 'root',
  password: 'example',
  entities: [Post],
  synchronize: false,
  migrations: [path.join(__dirname, './migrations/*.ts')],
};

export default config;
