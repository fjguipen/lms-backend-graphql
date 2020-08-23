import { resolveAnswers } from "./handlers/resolve";

export default {
  Query: {
    evaluation: () =>  null,
    evaluations: () =>  null,
  },
  Evaluation: {
    answers: resolveAnswers
  }
}