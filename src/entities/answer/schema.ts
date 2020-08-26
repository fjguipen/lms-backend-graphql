import { gql } from 'apollo-server-core';

export default gql`
  # type Query {
  #   answer(id: Int!): Answer
  #   answers(iput: AnswerFilterInput): [Answer]
  # }

  type Answer {
    id: Int!
    question_id: Int
    evaluation_id: Int
    value: String
  }

  # input AnswerFilterInput {
  #   quizz_id: Int
  #   question_id: Int
  #   user_id: Int
  #   evaluation_id: Int
  # }
`;
