import { gql } from "apollo-server-core";

export default gql`
  type Query {
    user(id: Int): User
  }

  type Mutation {
    login(input: LoginInput): CurrentUser
    logout: CurrentUser
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
  type BaseUser implements User{
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
  }

  type Professor implements User{
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
  }

  type CurrentUser {
    id: Int!
    name: String
    username: String
    email: String
  }

  input LoginInput {
    username: String
    password: String
  }
`