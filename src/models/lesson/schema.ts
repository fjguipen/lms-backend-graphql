import { gql } from "apollo-server-core";

export default gql`
  extend type Query {
    lesson: String
  }
`