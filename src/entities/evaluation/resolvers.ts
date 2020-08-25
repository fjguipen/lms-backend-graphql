import { authorize } from '../../auth';
import { EvaluationModel } from './model';
import {
  resolveEvaluationAnswers,
  resolveEvaluationAuthor,
  resolveEvaluationQuizz,
} from './handlers/resolve';
import { ROLES } from '../../auth/types';

export default {
  Query: {
    evaluation: authorize(EvaluationModel.get, [ROLES.PROFESSOR]),
    evaluations: authorize(EvaluationModel.getMany, [ROLES.PROFESSOR]),
  },
  Mutation: {
    evaluateQuizz: authorize(EvaluationModel.evaluateQuizz, [ROLES.STUDENT]),
  },
  Evaluation: {
    answers: resolveEvaluationAnswers,
    quizz: resolveEvaluationQuizz,
    author: resolveEvaluationAuthor,
  },
};
