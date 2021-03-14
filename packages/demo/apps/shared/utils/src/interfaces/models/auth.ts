import { ID } from '@datorama/akita';

export interface IUser {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IAuthToken {
  accessToken: string;
  expiresIn: number;
}
