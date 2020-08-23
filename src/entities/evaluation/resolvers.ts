import { resolveAnswers } from "./handlers/resolve";
import { authorize } from "../../auth";
import { EvaluationModel } from "./model";
import { ROLES } from "../../auth/types";

export default {
  Query: {
    evaluation: () =>  null,
    evaluations: () =>  null,
  },
  Mutation:{
    evaluateQuizz: authorize(EvaluationModel.evaluateQuizz, [ROLES.STUDENT])
  },
  Evaluation: {
    answers: resolveAnswers
  }
}