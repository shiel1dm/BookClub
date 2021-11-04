import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      User {
        _id
        name
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
      _id
      name
      savedBooks
    }
  }
`;

export const REMOVE_BOOK = gql `
mutation removeBook($userID: ID!, $book: String!){
  removeBook(userId: $userID, book: $book){
    _id
    name
    savedBooks
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      User {
        _id
        name
      }
    }
  }
`;