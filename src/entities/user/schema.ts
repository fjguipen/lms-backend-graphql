import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    user(id: Int!): User
  }

  type Mutation {
    login(input: LoginInput): CurrentUser
    logout: Boolean
    createUser(input: CreateUserInput): User
    createUser(input: UdateUserInput): User
  }

  interface User {
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
  }

  # Just generate type for ModelClass
  type BaseUser implements User {
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
  }

  type Professor implements User {
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
  }

  type Student implements User {
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
    evaluations: [Evaluation]
    completed_lessons: [Lesson]
    viewedContents: [Int]
  }

  type CurrentUser {
    id: Int!
    name: String
    username: String
    email: String
    viewedContents: [Int]
  }

  input LoginInput {
    username: String
    password: String
  }

  input CreateUserInput {
    name: String
    surname: String
    email: String
    rol: [String]
    username: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    surname: String
    email: String
    rol: [String]
    username: String
    password: String
  }
`;
