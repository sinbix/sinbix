import { ISafeUser } from '../user';

export type IAuthResponse = {
  accessToken: string;
  expiresIn: number;
  user: ISafeUser;
};
