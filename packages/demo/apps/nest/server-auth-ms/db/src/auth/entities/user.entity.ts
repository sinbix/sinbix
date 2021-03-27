import type { IUser, IUserProfile } from '@sinbix/demo/apps/shared/utils';
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

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: IUser;

  @Column({ type: 'varchar', length: 200 })
  firstName: string;

  @Column({ type: 'varchar', length: 200 })
  lastName: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  profile: UserProfile;
}
