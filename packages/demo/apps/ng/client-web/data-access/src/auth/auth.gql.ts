import { gql } from 'apollo-angular';
import { ISigninInput } from '@sinbix/demo/apps/shared/utils';

export const SIGNIN = gql`
  mutation($data: SigninInput!) {
    signin(data: $data) {
      expiresIn
      accessToken
    }
  }
`;

export const POSTS = gql`
  query {
    posts {
      id
      authorId
      title
      content
    }
  }
`;
