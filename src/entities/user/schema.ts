import { gql } from "apollo-server-core";

export default gql`
  type Query {
    user(id: Int): User
  }

  type Mutation {
    login(input: LoginInput): CurrentUser
    logout: CurrentUser
  }

  type User {
    id: Int!
    name: String
    email: String
    username: String
    password: String
    rol: [String]
  }

  type CurrentUser {
    id: ID!
    name: String
    email: String
  }

  input LoginInput {
    username: String
    password: String
  }
`