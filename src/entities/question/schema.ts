import { gql } from "apollo-server-core";

export default gql`
  type Query {
    question(id: Int): Question
    questions(input: QuestionFilterInput): [Question]
  }

  type Question {
    id: Int!
    quizz_id: Int
    text: String
    type: String!
    order_position: Int
    options: [QuestionOption!]
  }

  type QuestionOption {
    id: Int!
    question_id: Int
    text: String
    is_correct: Boolean
  }

  input QuestionFilterInput {
    quizz_id: Int
  }
`;
