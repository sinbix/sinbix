import { gql } from 'apollo-angular';

export const SIGNIN = gql`
  mutation($data: SigninInput!) {
    signin(data: $data) {
      userId
      expiresIn
      accessToken
    }
  }
`;
