import { ID } from '@datorama/akita';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IAuthToken {
  accessToken: string;
  expiresIn: number;
}
