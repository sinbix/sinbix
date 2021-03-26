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

export const SIGNUP = gql`
  mutation($data: SignupInput!) {
    signup(data: $data) {
      userId
      expiresIn
      accessToken
    }
  }
`;
