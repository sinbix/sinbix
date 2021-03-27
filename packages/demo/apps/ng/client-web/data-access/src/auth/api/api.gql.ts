import { gql } from 'apollo-angular';

export const SIGNIN = gql`
  mutation($data: SigninInput!) {
    signin(data: $data) {
      user {
        email
        profile {
          firstName
          lastName
        }
      }
      expiresIn
      accessToken
    }
  }
`;

export const SIGNUP = gql`
  mutation($data: SignupInput!) {
    signup(data: $data) {
      user
      expiresIn
      accessToken
    }
  }
`;
