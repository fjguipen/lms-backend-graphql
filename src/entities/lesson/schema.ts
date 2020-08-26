import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    lesson(id: Int): Lesson
    lessons(input: LessonsFilterInput): [Lesson]
  }

  type Lesson {
    id: Int!
    title: String
    description: String
    level_id: Int
    order_position: Int
    contents: [Content]
  }

  input LessonsFilterInput {
    level_id: Int
  }
`;
