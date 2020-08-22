import { gql } from "apollo-server-core";

export default gql`
  type Query {
    evaluation(id: Int): Evaluation
    evaluations(input: EvaluationFilterInput): [Evaluation]
  }

  type Evaluation {
    id: Int!
    user_id: Int
    quizz_id: Int
    mark: Int
    success: Boolean
    created: String
  }

  input EvaluationFilterInput {
    user_id: Int
    quizz_id: Int
    lesson_id: Int
  }
`