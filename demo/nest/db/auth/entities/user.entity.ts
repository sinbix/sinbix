import {
  MAX_EMAIL,
  MAX_FIRST_NAME,
  MAX_LAST_NAME,
} from '@sinbix/demo/shared/utils/user';
import type { IUser, IUserProfile } from '@sinbix/demo/shared/utils/user';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash, compare } from 'bcrypt';

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

  @Column({ type: 'varchar', length: MAX_FIRST_NAME })
  firstName: string;

  @Column({ type: 'varchar', length: MAX_LAST_NAME })
  lastName: string;
}

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: MAX_EMAIL })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  profile: UserProfile;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
