import { IUser, IUserProfile } from '@sinbix/demo/apps/shared/utils';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserProfile implements IUserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: IUser;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;
}
