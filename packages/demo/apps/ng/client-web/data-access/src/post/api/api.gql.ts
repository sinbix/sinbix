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

export const CREATE_POST = gql`
  mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      authorId
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
      title
      content
    }
  }
`;
