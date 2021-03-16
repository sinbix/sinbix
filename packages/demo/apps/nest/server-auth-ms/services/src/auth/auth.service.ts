import { Injectable } from '@nestjs/common';

import {
  IAuthGateway,
  IAuthToken,
  ISignInInput,
  ISignUpInput,
  IUser,
} from '@sinbix/demo/apps/shared/utils';

@Injectable()
export class AuthService implements IAuthGateway {
  constructor() {} // private readonly postRepository: Repository<Post> // @InjectRepository(Post)

  async getUsers(): Promise<IUser[]> {
    return [];
  }
  singin(data: ISignInInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
  signup(data: ISignUpInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
}
