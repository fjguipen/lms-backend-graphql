import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    content(id: Int!): Content
    contents(input: ContentsFilterInput): [Content]
  }

  type Mutation {
    createContent(input: CreateContentInput!): Content
    updateContent(input: UpdateContentInput!): Content
    deleteContent(ids: [Int!]!): [Int]
    setViewedContent(input: SetViewContentInput!): Boolean
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
    questions: [CreateQuestionInput]
    lesson_id: Int!
    order_position: Int
    text: String
  }

  input UpdateContentInput {
    id: Int!
    questions: [CreateQuestionInput]
    lesson_id: Int
    #order_position: Int
    text: String
  }

  input SetViewContentInput {
    content_id: Int!
  }
`;
