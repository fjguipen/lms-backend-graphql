import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    lesson(id: Int!): Lesson
    lessons(input: LessonsFilterInput): [Lesson]
  }

  type Mutation {
    createLesson(input: CreateLessonInput): Lesson
    updateLesson(input: UpdateLessonInput): Lesson
    deleteLesson(ids: [Int!]!): [Int]
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

  input CreateLessonInput {
    title: String!
    level_id: Int!
    description: String!
  }

  input UpdateLessonInput {
    id: Int!
    title: String
    description: String
  }
`;
