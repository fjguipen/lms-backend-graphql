import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    level(id: Int!): Level
    levels: [Level!]
  }

  type Level {
    id: Int!
    title: String
    description: String
    lessons: [Lesson]
  }
`;
