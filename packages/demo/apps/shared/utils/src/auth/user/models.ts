export interface IUser {
  id: number;
  email: string;
  password: string;
  profile: IUserProfile;
}

export interface IUserProfile {
  user: IUser;
  firstName: string;
  lastName: string;
}

export interface ISafeUser {
  id: number;
  email: string;
  profile: IUserProfile;
}
