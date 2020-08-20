import { gql } from "apollo-server-core";

export default gql`
  type Query {
    content(id: Int): Content
    contents(input: ContentsFilterInput): [Content]
  }

  type FormattedText {
    id: Int!
    value: String
  }

  type Quizz {
    id: Int!
    questions: [Question]
  }

  type Content {
    id: Int!
    lesson_id: Int
    type: String!
    order_position: Int
    quizz: Quizz
    text: FormattedText 

  }

  input ContentsFilterInput {
    lesson_id: Int
    type: String
  }
`