import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    content(id: Int): Content
    contents(input: ContentsFilterInput): [Content]
  }

  type Mutation {
    createContent(input: CreateContentInput): Content
    updateContent(input: UpdateContentInput): Content
    deleteContent(ids: [Int]): [Content]
  }

  type FormattedText implements Content {
    id: Int!
    lesson_id: Int
    type: String!
    order_position: Int
    value: String
  }

  type Quizz implements Content {
    id: Int!
    lesson_id: Int
    type: String!
    order_position: Int
    questions: [Question]
  }

  interface Content {
    id: Int!
    lesson_id: Int
    type: String!
    order_position: Int
  }

  input ContentsFilterInput {
    lesson_id: Int
    type: String
  }

  input CreateContentInput {
    type: String!
    questions: [QuestionInput]
    lesson_id: Int!
    order_position: Int
    text: String
  }

  input UpdateContentInput {
    id: Int!
    type: String
    questions: [QuestionInput]
    lesson_id: Int
    order_position: Int
    text: String
  }

  input QuestionInput {
    type: String
    text: String
    options: [String]
    are_correct: [Int]
  }
`;
