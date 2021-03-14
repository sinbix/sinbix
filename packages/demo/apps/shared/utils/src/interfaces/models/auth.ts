import { ID } from '@datorama/akita';

export interface IUser {
  id: ID;
  email: string;
  username: string;
  password: string;
}
