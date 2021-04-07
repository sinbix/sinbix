import { ISafeUser } from '@sinbix/demo/shared/utils/user';

export type IAuthResponse = {
  accessToken: string;
  expiresIn: number;
  user: ISafeUser;
};
