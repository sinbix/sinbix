import {
  MAX_EMAIL,
  MAX_FIRST_NAME,
  MAX_LAST_NAME,
} from '@sinbix/demo/shared/utils/user';
import type { IUser, IUserProfile } from '@sinbix/demo/shared/utils/user';
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash, compare } from 'bcrypt';
import { IBatchPayload } from '@sinbix/demo/shared/utils/shared';
import { IPostAuthorDeleteArgs } from '@sinbix/demo/shared/utils/post';
import { MsClient } from '@sinbix-nest/microservices';
import { IAuthInput } from '@sinbix/demo/shared/utils/auth';

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

  private _auth: IAuthInput;
  private blogClient: MsClient;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeRemove()
  async deletePosts() {
    if (!this._auth) {
      throw new Error('Forbidden resource');
    }
    if (!this.blogClient) {
      throw new Error('blogClient undefined');
    }

    await this.blogClient
      .send<IBatchPayload, IPostAuthorDeleteArgs>('deleteAuthorPosts', {
        authorId: this.id,
        _auth: this._auth,
      })
      .toPromise();
  }

  validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  setAuth(auth: IAuthInput) {
    this._auth = auth;
  }

  setBlogClient(blogClient: MsClient) {
    this.blogClient = blogClient;
  }
}
