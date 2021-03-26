import { gql } from 'apollo-angular';

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
